import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { isStaleChunkError } from '@/lib/lazyWithRetry';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log in dev and prod so issues are diagnosable from the deployed site.
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleReset = () => {
    // A failed chunk import means the cached page references files a newer
    // deploy replaced — re-rendering would just re-import the same dead
    // URL, so hard-reload to fetch the fresh manifest instead.
    if (isStaleChunkError(this.state.error)) {
      window.location.reload();
      return;
    }
    // Otherwise just clear the error state and re-render — don't navigate.
    // Navigating to a hard-coded path breaks under HashRouter on a GitHub
    // Pages project subpath, and there's no need to leave the current route
    // anyway: a re-render usually recovers if the cause was transient.
    this.setState({ hasError: false, error: undefined });
  };

  private handleHome = () => {
    // HashRouter route reset: clear the hash route, keep the project subpath.
    window.location.hash = '#/';
    if (isStaleChunkError(this.state.error)) {
      window.location.reload();
      return;
    }
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      // Translate the stale-deploy case for humans; raw import errors read
      // as a broken site when the fix is just fetching the new version.
      const msg = isStaleChunkError(this.state.error)
        ? 'This page was updated since you opened it. Try again to load the new version.'
        : this.state.error?.message ?? 'Unknown error';
      return (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-md text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-destructive/10">
                <AlertCircle className="size-12 text-destructive" />
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-light tracking-wide">
                Something went wrong
              </h1>
              <p className="text-base text-muted-foreground font-light leading-relaxed">
                {msg}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleReset}
                variant="outline"
                className="w-full sm:w-auto px-6 py-5 text-base font-light tracking-wide"
              >
                Try again
              </Button>
              <Button
                onClick={this.handleHome}
                className="w-full sm:w-auto px-6 py-5 text-base font-light tracking-wide"
              >
                Return home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
