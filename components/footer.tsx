import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between md:h-16">
        <p className="text-sm leading-loose text-muted-foreground">
          &copy; {new Date().getFullYear()} OptiTrade. All rights reserved. This is a mock trading platform.
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </a>
      </div>
    </footer>
  )
}
