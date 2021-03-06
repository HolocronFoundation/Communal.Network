# Communal.Network

Communal.Network is a Modular Media Distributed Distribution Secure System (MMDDSS), originally developed by The Holocron.Foundation.

**Modular:** The Holocron.Foundation designed Communal.Network to be modular via two pathways:
* **Channels:** Anyone can claim a channel, and then define how the channel functions - what content the channel distributes, how the UI displays content, who or what can add content to a channel, what governance mechanisms a channel employs...
* **Modules:** Modules enable functionality. Modules can live solely on the front-end, enabling users to perform actions such as saving posts, or they can exist on the front and back-end, enabling basic display functionality such as usernames, or it can be more interactive, such as voting up or down posts, or crowdfunding initiatives, tipping...

**Media:** Communal.Network can distribute any digital media, and users can interact with any media which has a front-end enabled directly in the browser. You can send basic text strings, stream video, share customized posts, music...

**Distributed:** The Holocron.Foundation placed Communal.Network on the Ethereum blockchain; the Ethereum blockchain distributes Communal.Network via thousands of computers, located globally, each containing a backup of Communal.Network, in a P2P manner. This global P2P distribution provides censorship-resistance to the network.

**Distribution:** The Holocron.Foundation designed Communal.Network to be simple and clean, featuring a lightweight UI, enabling you to distribute anything. You can also interact directly with Communal.Network using lower level interfaces, such as a JavaScript console, or your own contract calls directly on the Ethereum blockchain.

**Secure:** The Ethereum blockchain provides three key pieces of security to Communal.Network:
* **Personal info/password security:** You are *never* required to send a password, email address, name, or other piece of information to the network.
* **Spam-resistance:** Due to the costs of transacting using Ethereum, this discourages spam by putting the cost to interact with the network on the spammer, rather than on the server-runner.
* **Auditable:** You can audit the open source code.

**System:** Communal.Network consists of a primary back-end, front-end, and file distribution working in tandem and requiring no maintenance:
* **Back-end:** Communal.Network's primary back-end is the Ethereum blockchain. The Ethereum blockchain contains the basic configuration information, files, hashes, and logic which run and distribute Communal.Network. The Holocron.Foundation has coded the back-end in Vyper.
* **Front-end:** The Holocron.Foundation build the primary front-end using HTML, CSS, and JavaScript, a traditional front-end web stack. This front-end displays user content and allows users to distribute content.
* **File-distribution:** Users can store files using IPFS and distribute the hashes of those files via the Ethereum back-end. Users can post content via IPFS directly in their browser, or post files to IPFS and later distribute the hashes via Communal.Network.

Communal.Network is open source, and The Holocron.Foundation has licensed the code under the CC0 license - effectively, the code is in the public domain. The Holocron.Foundation appreciates contributions to the Communal.Network code-base!

## Development items

Most development items are listed in their respective files in comments starting with TODO. The items below are items which have not found a home yet.

- Create a makefile which will compile Vyper and insert the proper interface into individual files as needed (e.g. ABI into JS, interface into modules)
- Implement a CN IPFS server script, which will backup everything posted to CN.
- IPFS:
  - Review IPFS v1 hashes, and potentially incorporate into C.N.
  - Look into hosting site via IPFS/github (_see_ DNSLink)
  - Watch this https://docs.ipfs.io/guides/concepts/mfs/
- Should editing be allowed? If so, allow via IPNS, if not then use hashes
- Setup one of my servers to host content sent to C.N. until it grows

## Misc notes

These notes do not have a perfect home, but are important to the development of CN.

### Channel Design Notes

Channels need to be highly flexible - they will each need to exist in their unique formats. There also needs to be the ability to compile them into a "website" in a different fashion than the traditional feed layout - some channels are intended to last forever.

Some initial channels follow below:
- Wikidumps
  - A very basic data feed, containing the latest wikidumps (initially English, later all if we recieve funding.) Late, could create a dWiki?
- Feed
  - A very basic feed, displaying items in order that they were sent. This is essentially the "unchanneled" communal network. Items are displayed in order, and anyone may make a post.
- Vote
  - A feed sorted based upon types of posts submitted weighted by votes. Initially one, but could later add subcategories
- Gutenberg
  - The most complex case, can be viewed in a feed form, highlighting the latest books, or could switch to a "library" form, which is searchable and browseable more like a traditional website