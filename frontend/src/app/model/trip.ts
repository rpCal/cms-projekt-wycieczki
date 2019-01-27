export class Trip {
    
    constructor(
        public guid: string,
        public name: string, 
        public city: string, 
        public departureDate: Date, 
        public arrivalDate: Date, 
        public price: number,
        public describe: string, 
        public departurePlace: string, 
        public numberOfPlaces: number, 
        public availableNumberOfPlaces: number, 
        public archive: boolean, 
        public promote: number, 
        public photoUrl: string) {
    }

    static getEmptyTrip(): Trip{
        return new Trip(null,null,null,null,null,null,null,null,null,null,null,null,null);
    }

    updateTrip(name: string, city: string, departureDate: Date, arrivalDate: Date, 
        price: number, describe: string, departurePlace: string, numberOfPlaces: number, 
        availableNumberOfPlaces: number, archive: boolean, promote: number, 
        photoUrl: string){
            if(name){
                this.name = name;
            }

    }
}