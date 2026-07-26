/**
 * Is this pane the one the user can actually SEE in its zone?
 *
 * The React-side counterpart to pane-visibility.ts: a tab group keeps every
 * ever-active pane MOUNTED and merely hides the inactive ones, so a background
 * tab's subtree keeps rendering, keeps subscribing, and keeps measuring for a
 * surface nobody is looking at. DOM lookups skip those panes via the
 * `data-pane-hidden` marker; React subtrees skip them by reading this.
 *
 * A pane rendered outside a tree group (a standalone surface, a test) is
 * always active — the default keeps those callers unchanged.
 */

import { createContext, type ReactNode, useContext } from 'react'

const PaneActiveContext = createContext(true)

/** True unless this subtree is inside a kept-alive, currently hidden tab. */
export const usePaneActive = (): boolean => useContext(PaneActiveContext)

export const PaneActiveProvider = ({ active, children }: { active: boolean; children: ReactNode }) => (
  <PaneActiveContext.Provider value={active}>{children}</PaneActiveContext.Provider>
)
