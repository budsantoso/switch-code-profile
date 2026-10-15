export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="flex items-center gap-2 font-mono text-sm">
          <span className="text-accent">&lt;&gt;</span>
          <span className="font-heading font-bold tracking-tight">SWITCH CODE</span>
          <span className="text-muted-foreground">— Software Development Solutions</span>
        </p>
        <p className="text-xs text-muted-foreground">
          © 2026 Switch Code. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
