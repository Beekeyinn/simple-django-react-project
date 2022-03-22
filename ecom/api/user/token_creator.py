import random, string

def generate_token(length=10, chars=string.ascii_lowercase+string.digits+string.ascii_uppercase):
    return "".join(random.choice(chars) for _ in range(length) )

