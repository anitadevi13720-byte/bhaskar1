import os
import glob

commands_dir = 'c:\\Users\\pawan\\Downloads\\promo\\commands'

for file_path in glob.glob(os.path.join(commands_dir, '*.js')):
    file_name = os.path.basename(file_path)
    cmd_name = file_name.replace('.js', '')
    
    # If the file already has /*CMD, skip
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    if '/*CMD' in content:
        continue
        
    need_reply = 'false'
    if cmd_name.startswith('_do_') or cmd_name == '_upload_payment':
        need_reply = 'true'
        
    # Map command name properly
    bb_cmd = cmd_name
    if cmd_name == '_start':
        bb_cmd = '/start'
    elif cmd_name == 'all':
        bb_cmd = '*'
    elif cmd_name.startswith('_'):
        bb_cmd = '/' + cmd_name[1:]
        
    header = f\"\"\"/*CMD
  command: {bb_cmd}
  help: 
  need_reply: {need_reply}
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

\"\"\"
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(header + content)
