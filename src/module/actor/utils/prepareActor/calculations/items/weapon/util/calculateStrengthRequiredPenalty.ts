import { ShotType, WeaponDataSource } from '../../../../../../../types/combat/WeaponItemConfig';
import { ABFActorDataSourceData } from '../../../../../../../types/Actor';
import { getStrengthRequirement } from './getStrengthRequirement';

export const calculateStrengthRequiredPenalty = (weapon: WeaponDataSource, data: ABFActorDataSourceData) => {
  const actorStrength = data.characteristics.primaries.strength.value;

  let strengthDifference;

  if (weapon.data.isRanged.value && weapon.data.shotType.value === ShotType.THROW) {
    strengthDifference = weapon.data.weaponFue.value - actorStrength;
  } else {
    strengthDifference = getStrengthRequirement(weapon) - actorStrength;
  }

  return strengthDifference > 0 ? -(strengthDifference * 10) : 0;
};