/**
 * aaj. Cooking session + cooking log storage.
 * Separate localStorage keys: never touches remembered groceries.
 * "cooking_started" and "cooking_completed" are distinct events in the log.
 */
export const SESSION_KEY = 'aaj_cooking_session_v1';
export const LOG_KEY = 'aaj_cooking_log_v1';

const read = (k, fallback) => {
  try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fallback; }
  catch (e) { console.warn('aaj. storage read failed:', k, e); return fallback; }
};
const write = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)); }
  catch (e) { console.warn('aaj. storage write failed:', k, e); }
};

export const loadSession = () => read(SESSION_KEY, null);
export const saveSession = (s) => write(SESSION_KEY, s);
export const clearSession = () => { try { localStorage.removeItem(SESSION_KEY); } catch (e) {} };

export const getCookingLog = () => read(LOG_KEY, []);
export function logCookingEvent(type, session, dish) {
  const log = getCookingLog();
  log.push({ type, sessionId: session.sessionId, dishId: dish.id, dishName: dish.name, at: new Date().toISOString() });
  write(LOG_KEY, log);
}
