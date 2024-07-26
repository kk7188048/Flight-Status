import firebase_admin
from firebase_admin import messaging
from firebase_admin import credentials
from app.firebase import get_firebase_app
from app.email import send_email
from app.sms import send_sms

firebase_app = get_firebase_app()

async def send_notification(flight_status):
    # Firebase notification
    message = messaging.Message(
        data={
            "flight_id": flight_status.flight_id,
            "status": flight_status.status,
            "gate": flight_status.gate,
            "delay": str(flight_status.delay) if flight_status.delay else "0",
        },
        topic=flight_status.flight_id,
    )

    try:
        response = messaging.send(message, app=firebase_app)
        print("Successfully sent Firebase message:", response)
    except Exception as e:
        print("Failed to send Firebase notification:", e)

    # Email notification
    subject = f"Flight {flight_status.flight_id} Status Update"
    body = f"Status: {flight_status.status}\nGate: {flight_status.gate}\nDelay: {flight_status.delay if flight_status.delay else 'No Delay'}"
    recipient = "kk7188048@gmail.com"
    send_email(subject, recipient, body)

    sms_body = f"Flight {flight_status.flight_id} Status Update: {flight_status.status}, Gate: {flight_status.gate}, Delay: {flight_status.delay if flight_status.delay else 'No Delay'}"
    sms_recipient = "+918700021828"
    send_sms(sms_recipient, sms_body)
