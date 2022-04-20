import { InteractionLog } from "./interaction-log";

export class InteractionLogContainer {
    private interactions: InteractionLog[] = [];

    filterInteraction(
        finder: (e: InteractionLog) => boolean
    ): InteractionLog[] {
        return this.interactions.filter((e) => finder(e));
    }

    addInteraction(interaction: InteractionLog) {
        this.interactions.push(interaction);
    }
}
