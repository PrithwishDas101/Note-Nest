import { Zap, Clock3 } from "lucide-react";

const RateLimitedUI = () => (
  <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
    <section role="status" className="flex flex-col gap-4 rounded-2xl border border-warning/20 bg-warning/5 p-5 sm:flex-row sm:items-center sm:p-6">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-warning/10 text-warning">
        <Zap className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="font-semibold tracking-tight text-base-content">A little pause</h2>
        <p className="mt-1 text-sm leading-6 text-base-content/65">
          Too many requests came in at once. Give it a moment, then try again.
        </p>
      </div>
      <span className="inline-flex items-center gap-2 text-xs text-base-content/55 sm:shrink-0">
        <Clock3 className="size-4" />
        Temporary rate limit
      </span>
    </section>
  </div>
);

export default RateLimitedUI;