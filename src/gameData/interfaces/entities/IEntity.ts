import IEffect from "../IEffect";
import IInventorySlot from "../IInventorySlot";
import IMagicalAttack from "../skills/IMagicalAttack";
import IPhysicalAttack from "../skills/IPhysicalAttack";
import ISkill from "../skills/ISkill";

export enum EntityStatNames{
    maxHP="maxHP",
    maxMana="maxMana",
    physAtt="physAtt",
    magicAtt="magicAtt",
    physDef="physDef",
    magicDef="magicDef",
    speed="speed",
}

export interface DmgReturn {
    dmg: number
    killed: boolean
}

export default interface IEntity{
    name?:string;
    bio?:string;

    maxHP:number;
    // get maxHP():number;
    // set maxHP(value:number);
    
    maxMana:number;
    // get maxMana():number;
    // set maxMana(value:number);
    
    currHP:number;
    // get currHP():number;
    
    currMana:number;
    // get currMana():number;

    physAtt:number;
    magicAtt:number;

    physDef:number;
    magicDef:number;

    speed:number;

    basicSkill:ISkill;

    physSkills?:IPhysicalAttack[];

    magicSkills?:IMagicalAttack[];

    inventory?:IInventorySlot[];

    activeEffects?:IEffect[];

    takePhysDmg(amt:number):DmgReturn;
    takeMagicDmg(amt:number):DmgReturn;
    healHP(amt:number):number|void;
    useMana(amt:number):number|boolean;
    healMana(amt:number):number|void;
    isDead():boolean;
    useBasicSkill(target:IEntity):boolean|DmgReturn
    usePhysSkill?(skill:IPhysicalAttack,target:IEntity):boolean
    useMagicSkill?(skill:IMagicalAttack,target:IEntity):boolean
}