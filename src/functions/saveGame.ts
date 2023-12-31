import Campaign, { GameLocationConnections } from "../gameData/classes/Campaign";
import { AccessFlagTypes } from "../gameData/interfaces/ICampaign";
import ISaveData from "../interfaces/ISaveData";
import SaveResponse from "../interfaces/SaveResponse";

export default async function saveGame(
    userToken:string,
    campaign:Campaign,
    location?:GameLocationConnections,
    saveID?:number){
    let flags=0
    let loc=0
    let checkForCurrLoc=true
    let checkForFlags=true
    for (let i = 0; i < campaign.locations.length; i++) {
        const gameLocCon = campaign.locations[i];
        const accFlag=gameLocCon.accessFlag

        if(checkForCurrLoc){
            if(gameLocCon===location){
                loc=i
                checkForCurrLoc=false
            }
        }

        if(checkForFlags){
            if(typeof accFlag!=="undefined"){
                if(accFlag.type===AccessFlagTypes.Visited){
                    if(!accFlag.location.visited){
                        checkForFlags=false
                    }else{
                        flags++
                    }
                }
            }
        }
        if(!checkForCurrLoc&&!checkForFlags){
            break
        }
    }

    const saveData:ISaveData={
        flags,
        current_location:loc,
    }

    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/save_files/${typeof saveID !== "undefined"?`${saveID}/`:""}`,
        {
            method: `${typeof saveID!=="undefined"?"PUT":"POST"}`,
            body:JSON.stringify(saveData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${userToken}`,
            },
        }
    )

    const respData:SaveResponse=await response.json()

    return respData
}