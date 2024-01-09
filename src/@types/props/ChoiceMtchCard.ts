export interface IChoiceMatchCard{
    name:string,
    state:string,
    status:string,
    choiceMatchId:string,
    handleUnchoice?: (choiceId: string) => Promise<void>
}