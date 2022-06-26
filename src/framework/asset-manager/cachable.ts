export class Cachable<Value> {
    private store: Record<string, Value> = {};

    add(key: string, value: Value) {
        this.store[key] = value;
    }

    get(key: string) {
        return this.store[key];
    }

    delete(key: string) {
        delete this.store[key];
    }

    clear() {
        this.store = {};
    }
}
