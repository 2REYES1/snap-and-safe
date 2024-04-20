import smtplib
import schedule
from email.message import EmailMessage

def email_alert(subject, body, to):
    msg = EmailMessage()
    msg.set_content(body)
    msg['subject'] = subject
    msg['to'] = to

    user = "nightmoon0731@gmail.com" # email location
    msg['from'] = user
    password = "qsmdxtkpxaxatikb" # password here

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(user, password)
    server.send_message(msg)

    server.quit()



if __name__ == '__main__':
    # email_alert("Hey", "You Rock", "elyao@uci.edu")
    schedule.every().day.at("22:42").do(email_alert,"Hey", "You Paper", "elyao@uci.edu")

    while True:
        schedule.run_pending()