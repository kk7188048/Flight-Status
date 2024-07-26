from fastapi import APIRouter, HTTPException
from app.models import FlightStatus
from app.database import db
from app.notification import send_notification
import logging

router = APIRouter()

@router.post("/status/")
async def update_flight_status(flight_status: FlightStatus):
    try:
        flight = await db["flights"].find_one({"flight_id": flight_status.flight_id})
        if flight:
            await db["flights"].update_one({"flight_id": flight_status.flight_id}, {"$set": flight_status.dict()})
        else:
            await db["flights"].insert_one(flight_status.dict())
        
        # Send notification
        await send_notification(flight_status)
        
        logging.info(f"Flight status updated: {flight_status}")
        return {"message": "Flight status updated successfully"}
    except Exception as e:
        logging.error(f"Error updating flight status: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


from bson import ObjectId

@router.get("/status/{flight_id}")
async def get_flight_status(flight_id: str):
    try:
        flight = await db["flights"].find_one({"flight_id": flight_id})
        if flight:
            flight["_id"] = str(flight["_id"])  # Convert ObjectId to string
            flight.pop("_id", None)
            return flight
        else:
            raise HTTPException(status_code=404, detail="Flight not found")
    except Exception as e:
        logging.error(f"Error fetching flight status: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
