import { Session, User, Cookie } from "lucia";

export interface IAuthenticationService {
  validateSession(
    sessionId: Session["id"],
  ): Promise<{ user: User; session: Session }>;
  getSession(
    sessionId: Session["id"],
  ): Promise<{ user: User | null; session: Session | null }>;
  createSession(user: User): Promise<{ session: Session; cookie: Cookie }>;
  invalidateSession(sessionId: Session["id"]): Promise<{ blankCookie: Cookie }>;
  validateRequest(): Promise<{ user: User | null; session: Session | null }>;
}
