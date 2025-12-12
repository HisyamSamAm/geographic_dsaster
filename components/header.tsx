import { AlertTriangle } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        <AlertTriangle className="h-6 w-6 text-orange-500" />
        <div>
          <h1 className="text-lg font-semibold text-foreground">SIG Kebencanaan Indonesia</h1>
          <p className="text-xs text-muted-foreground">Sistem Informasi Geografis Bencana Real-time</p>
        </div>
      </div>
    </header>
  )
}
