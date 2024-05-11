import "server-only"
interface ActionError {
    name: 'action-error';
    message: string;
};
class ActionError extends Error implements ActionError {
    constructor(public message: string) {
        super(message);
        this.name = 'action-error';
        Error.captureStackTrace(this, this.constructor);
    }
}
export default ActionError;