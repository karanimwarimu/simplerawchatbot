from collections import defaultdict

chat_history = defaultdict(list)
def chat_history_chain(userid ,role , prompt) :
    chat_history[userid].append({"role" : role , "content" : prompt})

def get_chat_history(userid):
 return chat_history[userid]