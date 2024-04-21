import datetime
import os.path
import sys

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from datetime import datetime, timedelta

# Google Calendar API Quickstart 
#https://github.com/googleworkspace/python-samples/blob/main/calendar/quickstart/quickstart.py

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar']


def main(medication, time_to_take):
  """Shows basic usage of the Google Calendar API.
  Prints the start and name of the next 10 events on the user's calendar.
  """
  creds = None
  # The file token.json stores the user's access and refresh tokens, and is
  # created automatically when the authorization flow completes for the first
  # time.
  if os.path.exists("token.json"):
    creds = Credentials.from_authorized_user_file("token.json", SCOPES)
  # If there are no (valid) credentials available, let the user log in.
  if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
      creds.refresh(Request())
    else:
      flow = InstalledAppFlow.from_client_secrets_file(
          "credentials.json", SCOPES
      )
      creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open("token.json", "w") as token:
      token.write(creds.to_json())

  try:
    service = build("calendar", "v3", credentials=creds)

    description = f'{medication}'

    start_time = time_to_take # '2024-04-21T09:00:00-09:00'
    date_time_obj = datetime.fromisoformat(start_time)
    new_date_time_obj = date_time_obj + timedelta(hours=1)
    end_time = new_date_time_obj.isoformat()

    event = {
        'summary': description,
        'description': description,
        'start': {
            'dateTime': start_time,
            'timeZone': 'America/Los_Angeles',
        },
        'end': {
            'dateTime': end_time,
            'timeZone': 'America/Los_Angeles',
        },
    }

    event = service.events().insert(calendarId='primary', body=event).execute()
    print ('Event created: %s' % (event.get('htmlLink')))

  except HttpError as error:
    print(f"An error occurred: {error}")



if __name__ == "__main__":
  main("lexapro", '2024-04-21T09:00:00-09:00')