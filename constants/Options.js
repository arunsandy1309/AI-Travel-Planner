export const SelectTravelsList=[
    {
        id:1,
        title:"Just Me",
        desc: "Adventure for independent travelers.",
        icon:'🍺',
        people:'1'
    },
    {
        id:2,
        title:"A Couple",
        desc: "Love-filled adventures together.",
        icon:'🍻',
        people:'2'
    },
    {
        id:3,
        title:"Family",
        desc: "Creating memories for the family.",
        icon:'🏡',
        people:'3 to 5'
    },
    {
        id:4,
        title:"Friends",
        desc: "Adventures that strengthen bonds.",
        icon:'🕺',
        people:'5 to 10'
    }
]



export const SelectBudgetList=[
    {
        id:1,
        title:"Affordable",
        icon:'🪙',
    },
    {
        id:2,
        title:"Comfort",
        icon:'💳',
    },
    {
        id:3,
        title:"Luxury",
        icon:'💰',
    },
]

export const AI_PROMPT="You are a travel planner. Now I will give my estimated plan defining where I want to go, for how many days, with whom, and my budget.. Generate Travel Plan for Location: From Bufflo, NY to {location}, for {totalDays} Day and {totalNights} Night from {startDate} to {endDate} for {traveller} with a {budget} budget with Flight Details, Flight Prices with Booking URL, Hotel Options list with atleaset 6-7 Hotel Name, Hotel Address, Price is Mandatory and symbol, Hotel Image URL, Geographic Cooridinates, Hotel Rating, ratings, description and Places to visit nearby with Plane Names, Place Details, Place Image URL, Place Geographic Coordinates, Ticket Pricing, TIme to Travel each of the location in {totalDays} day and {totalNights} night with each day plan with best time to visit in JSON Format only."

export const RECOMMENDATION_PROMPT="Given the user's previous trip history {trip}, generate a JSON object with at least 10 unique travel recommendations. Ensure the recommendations are based on the user's prior destinations, interests, or travel patterns inferred. Each recommendation must be a country or state not already visited by the user. For each recommended location, include: 1. The name of the country or state. 2. A brief description about the unique aspects of the place."