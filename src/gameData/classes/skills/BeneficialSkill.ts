import IEntity from "../../interfaces/entities/IEntity";
import IBeneficialSkill from "../../interfaces/skills/IBeneficialSkill";
import ISkill from "../../interfaces/skills/ISkill";
import Skill from "./Skill";

export default class BeneficialSkill extends Skill implements IBeneficialSkill,ISkill{
    constructor(
        name:string,bio:string="",
        protected _manaCost:number=0,
        private healPower:number
    ){
        super(name,bio)
    }

    get manaCost(){
        return this._manaCost
    }

    public effect(user:IEntity,target=user):boolean{
        if(user.useMana(this.manaCost)===false){
            return false
        }
        target.healHP(this.healPower)
        return true
    }
}