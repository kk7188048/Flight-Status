@router.post("/flight-status/")
async def add_flight_status(flight_status: FlightStatus, current_user: User = Depends(get_current_user)):
    try:
        existing_flight = await db["flights"].find_one({"flight_id": flight_status.flight_id})
        if existing_flight:
            await db["flights"].update_one({"flight_id": flight_status.flight_id}, {"$set": flight_status.dict()})
            logging.info(f"Flight status updated: {flight_status.flight_id}")
        else:
            await db["flights"].insert_one(flight_status.dict())
            logging.info(f"Flight status added: {flight_status.flight_id}")

        # Find the updated or inserted document
        updated_flight = await db["flights"].find_one({"flight_id": flight_status.flight_id})
        if updated_flight:
            updated_flight["_id"] = str(updated_flight["_id"])  # Convert ObjectId to string

            # Broadcast the new flight status to all connected clients
            message = f"Flight {updated_flight['flight_id']} status updated: {updated_flight['status']}"
            await manager.broadcast(message)

            return updated_flight

        return {"message": "Flight status added successfully"}
    except Exception as e:
        logging.error(f"Error adding flight status: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
