from pydantic import BaseModel
from typing import Optional

class FlightStatus(BaseModel):
    flight_id: str
    status: str
    gate: Optional[str] = None
    delay: Optional[int] = None  # delay in minutes
