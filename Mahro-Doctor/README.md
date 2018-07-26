# Mahro-Doctor
App designed for Rajasthan Hackathon 5.0

## Installation

1. Clone the repository
2. Install the dependencies using `npm i`
3. Be connected to IITR Lan as the database server is hosted in Kanav's Laptop.
3. Run the server using `node index.js`
4. The server is accessible at `http://localhost:1807/`

## API Routes

### Appointments

1. `/api/initialise?doctor=DOCTOR_ID&patient=PATIENT_ID` - Start an appointment between doctor and patient and send an otp to patient and recieve the appointment id.
2. `/api/verify_appointment?id=APPOINTMENT_ID&otp=1234` - Verify the appointment using the otp recieved from patient and get an appointment token.
3. `/api/finalise_appointment?id=APPOINTMENT_ID&token=TOKEN&prescription=BASE64_ENCODED_JSON` - Push the result of appointment in database and mark appointment as complete.

### Accounts

1. `/api/login?uid=UID&password=PASSWORD` - Login into a session (common for both doctor and patient) and generate the secret Encrypted uid (EUID).
2. `/api/register?name=<URL_ENCODED_NAME>&uid=<UNIQUE_ID>&number=<MOBILE>&email=<EMAIL>&password=<PASSWORD>&is=doctor=<0_OR_1>` - Register and send an otp to phone
3. `/api/verify_account?uid=<UID>&otp=<OTP>` - verify the account.

### Fetch information

1. `/api/get_appointment_data?id=APPOINTMENT_ID&euid=ENCRYPTED_ID` - Get the appointment data if authorised.
2. `/api/get_doctor_appointments?euid=ENCRYPTED_UID` - Get all appointments of doctor
3. `/api/get_user_appointments?euid=ENCRYPTED_UID` - Get all appointments of user
4. `/api/get_doctor_name?uid=UID` - get name of doctor from uid
5. `/api/get_user_name?uid=UID` - get name of user from uid
6. `/api/get_nearby_doctors?euid=ENCRYPTED_UID`
