from uagents import Agent, Context, Model
from set_events import main

florance = Agent(name="Florence", seed="nightingale")

class Message(Model):
    medication: str
    time_to_take: str

prac = "pus"
timing = '2024-04-21T09:00:00-09:00'

@florance.on_event("startup")
async def send_msg(ctx: Context):
    ctx.logger.info(f"Hello, I'm agent {ctx.name} and my address is {ctx.address}.")
    message = "med, 2024-04-21T09:00:00-09:00" # str(input('You:'))
    # Sending the user's message back to the sender (restaurant agent)
    complete = f"Your medication of {prac} is added onto your calendar"
    main(prac, timing)
    ctx.logger.info(complete)



if __name__ == "__main__":
    florance.run()