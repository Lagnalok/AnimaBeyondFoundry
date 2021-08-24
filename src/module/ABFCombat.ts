import type { InitiativeOptions } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/foundry.js/clientDocuments/combat';
import { openModDialog } from './utils/openDialog';

export default class ABFCombat extends Combat {
  async nextRound() {
    // Reset initiative for everyone when going to the next round
    await this.resetAll();

    return super.nextRound();
  }

  // Modify rollInitiative so that it asks for modifiers
  async rollInitiative(
    ids: string[] | string,
    {
      updateTurn,
      messageOptions
    }: InitiativeOptions = {}
  ): Promise<this> {
    const mod = await openModDialog();

    const formula = `${CONFIG.Combat.initiative.formula} + ${mod}`;

    return super.rollInitiative(ids, {
      formula,
      updateTurn,
      messageOptions
    });
  }
}