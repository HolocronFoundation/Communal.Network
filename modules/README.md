
# Modules

## Progress

Base     | 1               | 2                 | 3              | 4            | Exists | Description : Notes
---------|-----------------|-------------------|----------------|--------------|--------|---------------------
account  | owner           | **deactivate.vy** |                |              | 1      |
account  | owner           | name              | **display.vy** |              | 1      |
account  | owner           | name              | **unique.vy**  |              | 1      |
account  | user            | name              | **display.vy** |              | 0      |
channels | **channels.vy** |                   |                |              | 1      |
channels | item            | **modules**       |                |              | 1      |
channels | item            | **UI**            |                |              | 1      |
channels | owner           | name              |                |              | 1      |
channels | owner           | name              | **display.vy** |              | 1      |
channels | owner           | name              | **unique.vy**  |              | 1      |
channels | send            | **UI**            |                |              | 1      |
item     | owner           | flag              | **hidden.vy**  |              | 1      |
item     | owner           | flag              | **mature.vy**  |              | 1      |
item     | owner+user      | fund              | goal           | **erc20.vy** | 1      |
item     | owner+user      | fund              | goal           | **eth.vy**   | 1      |

item     | user            | fund              | tip            | **erc20.vy** | 1      |
item     | user            | fund              | tip            | **eth.vy**   | 1      |

General notes:
- Change owner/owner+user/user to items that are indicated in code metadata, remove from folder structure
- Need to make better interaction structure/naming - e.g. user - name - display is more akin to tagging



