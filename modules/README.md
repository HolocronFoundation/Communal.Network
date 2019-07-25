
# Modules

## Progress

Base             | 2                 | 3               | 4            | Exists | Metadata (not yet implemented)  | Description : Notes
-----------------|-------------------|-----------------|--------------|--------|---------------------------------|--------------------
**alert.vy**     |                   |                 |              | 1      |                                 |
**full.vy**      |                   |                 |              | 1      |                                 |
**interface.vy** |                   |                 |              | 1      |                                 |
**reply.vy**     |                   |                 |              | 1      |                                 | : This is currently implemented in the core contract
account          | **deactivate.vy** |                 |              | 1      | user:address_owner              |
account          | name              | **display.vy**  |              | 1      | user:address_owner              |
account          | name              | **unique.vy**   |              | 1      | user:address_owner              |
account          | name              | **nickname.vy** |              | 0      | user:any                        |
channels         | **channels.vy**   |                 |              | 1      |                                 |
channels         | item              | **modules**     |              | 1      |                                 |
channels         | item              | **UI**          |              | 1      |                                 |
channels         | name              | **display.vy**  |              | 1      | user:channel_owner              |
channels         | name              | **unique.vy**   |              | 1      | user:channel_owner              |
channels         | send              | **UI**          |              | 1      |                                 |
item             | flag              | **hidden.vy**   |              | 1      | user:item_owner                 |
item             | flag              | **mature.vy**   |              | 1      | user:item_owner                 |
item             | fund              | goal            | **erc20.vy** | 1      | initializer:item_owner,user:any |
item             | fund              | goal            | **eth.vy**   | 1      | initializer:item_owner,user:any |
item             | **rate.vy**       |                 |              | 1      | user:any                        |
item             | **vote.vy**       |                 |              | 1      | user:any                        |
item             | fund              | tip             | **erc20.vy** | 1      | user:any                        |
item             | fund              | tip             | **eth.vy**   | 1      | user:any                        |
item             | tag               | **favorite.vy** |              | 1      | user:any                        |

Other:
- factory.py



General notes:
- Change owner/owner+user/user to items that are indicated in code metadata, remove from folder structure
- Need to make better interaction structure/naming - e.g. user - name - display is more akin to tagging
- Replace things like "nickname" with save user settings



