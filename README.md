# Warzone Team Finder

## :pushpin:Table of contents
1. [Description](https://github.com/SamSlotemaker/warzone-teamfinder#bookdescription)
2. [Installation](https://github.com/SamSlotemaker/warzone-teamfinder#gearinstallation)
3. [Concept](https://github.com/SamSlotemaker/warzone-teamfinder#pencilconcept)
4. [MOSCOW feature list](https://github.com/SamSlotemaker/warzone-teamfinder#clipboardmoscow-feature-list)
5. [Data](https://github.com/SamSlotemaker/warzone-teamfinder#minidiscdata)
6. [Real-time events](https://github.com/SamSlotemaker/warzone-teamfinder#satellitereal-time-events)
7. [Data flowchart](https://github.com/SamSlotemaker/warzone-teamfinder#arrows_clockwise-data-flowchart)
8. [NPM packages](https://github.com/SamSlotemaker/warzone-teamfinder#package-npm-packages)
---

## :book:Description
An application where you can find a Warzone team on your desired platform, when you are looking for that missing team member. Players will be added to a suggested team on joining the application, based on thier Kill/Death Ratio. Players can also join a custom team, while chatting with other online players. 

### Test account
SamSuperman_12 | Playstation
[LIVE LINK](https://warzone-teamfinder.herokuapp.com/)

---

## :gear:Installation
1. Clone this repo
```
git clone https://github.com/SamSlotemaker/warzone-teamfinder.git
```
2. Make sure you're in the right folder
```
cd warzone-teamfinder
```
3. Install dependencies
```
npm install
```
4. Start the application
```
npm start
```
5. For development you can run it in dev mode
```
npm run dev
```

---

## :pencil:Concept

### First three ideas
sketches can be found [here](https://github.com/SamSlotemaker/warzone-teamfinder/wiki/Concept-sketches)

#### Warzone loadout creator
An online application where you can setup your loadouts live with your friends and speculate which attachments should go on the gun and why.

#### Live buff/nerf voting
Vote love on certain updates or gamefeatures that need to be revisied by the developers.

#### Warzone team finder (FINAL CHOICE)
An application where you can find a team when you are looking for that missing link.

### Features

#### Login
Users need to login with thier call of duty info
* Username
* Platform

This is to authenticate real accounts and so stats can be portrayed when they are chatting.

The idea is to show something like:

```
User123
KD: 1.01 Wins: 10 Platform: Playstation
Hey i'm user123
```

#### Chatting
Users can chat with other users, when they are looking for a team. I want to make a few standard options users can send, like: 
_'Looking for +2, minimal KD: 1.5, minimal wins: 50'_

#### Show detailed stats
I want to make an option which sends a 'card' with a detailed overview of a player stats, with a button or with a '!stats' command, so users can show other players how good they are. It could be an idea to do something similar with recent matches. 

#### Chat history 
Users need to see old chats from when they weren't online, so they can still see other people who recently asked for a team. Preferably with a time stamp from when they were send

---

## :clipboard:MOSCOW feature list
#### Must have:
* [X] Chatting
* [X] Showing stats
* [X] Team finder
* [X] Profile authentication

#### Should have: 
* [X] Chat history
* [X] Team finder on KD (or other stats)
* [X] Chat timestamps
* [X] Custom team
 

#### Could have:
* [X] Offline feedback
* [X] Chat commands
* [ ] Detailed stats


#### Would have:
* [ ] Realtime create-a-class

---

## :minidisc:Data
I'm using a call of duty api from 
https://lierrmm.github.io/capi-docs/#/

### API description 
The call of duty API gives data about users, the data contains an overview of thier stats, unlocks, gamemodes, but also data about thier recent matches. 

You can extrect the data by using methods suchs as: 

```js
api.getDetailsWZ(username, platform)
```

### GET response
![api_data](https://user-images.githubusercontent.com/60625329/114550981-1a304b00-9c63-11eb-9718-57bb972471a0.png)

#### Complete get response
<details>
  <summary>response</summary>

  ```js
  {
    "title": "mw",
    "platform": "psn",
    "username": "mb27p",
    "type": "mp",
    "level": 128,
    "maxLevel": 0,
    "levelXpRemainder": 3000,
    "levelXpGained": 7000,
    "prestige": 0,
    "prestigeId": 0,
    "maxPrestige": 0,
    "totalXp": 960000,
    "paragonRank": 0,
    "paragonId": 0,
    "s": 1,
    "p": 1,
    "lifetime": {
      "all": {
        "properties": {
          "recordLongestWinStreak": 27,
          "recordXpInAMatch": 43710,
          "accuracy": 0.25064098834991455,
          "losses": 286,
          "totalGamesPlayed": 1153,
          "score": 3539504,
          "winLossRatio": 2.2727272510528564,
          "totalShots": 335037,
          "bestScoreXp": 0,
          "gamesPlayed": 1153,
          "bestSquardKills": 0,
          "bestSguardWave": 0,
          "bestConfirmed": 35,
          "deaths": 17370,
          "wins": 650,
          "bestSquardCrates": 0,
          "kdRatio": 1.2903281450271606,
          "bestAssists": 33,
          "bestFieldgoals": 0,
          "bestScore": 11700,
          "recordDeathsInAMatch": 75,
          "scorePerGame": 3069.8213356461406,
          "bestSPM": 1433,
          "bestKillChains": 0,
          "recordKillsInAMatch": 124,
          "suicides": 61,
          "wlRatio": 2.2727272510528564,
          "currentWinStreak": 0,
          "bestMatchBonusXp": 0,
          "bestMatchXp": 0,
          "bestSguardWeaponLevel": 0,
          "bestKD": 12.75,
          "kills": 22413,
          "bestKillsAsInfected": 3,
          "bestReturns": 0,
          "bestStabs": 1,
          "bestKillsAsSurvivor": 8,
          "timePlayedTotal": 460018,
          "bestDestructions": 0,
          "headshots": 3529,
          "bestRescues": 4,
          "assists": 5591,
          "ties": 2,
          "recordKillStreak": 15,
          "bestPlants": 2,
          "misses": 251063,
          "bestDamage": 0,
          "bestSetbacks": 0,
          "bestTouchdowns": 0,
          "scorePerMinute": 461.6563699681317,
          "bestDeaths": 75,
          "bestMedalXp": 0,
          "bestDefends": 40,
          "bestSquardRevives": 0,
          "bestKills": 124,
          "bestDefuses": 1,
          "bestCaptures": 14,
          "hits": 83974,
          "bestKillStreak": 15,
          "bestDenied": 15
        }
      },
      "mode": {
        "gun": {
          "properties": {
            "kills": 0,
            "score": 0,
            "timePlayed": 239,
            "kdRatio": 0,
            "setBacks": 0,
            "scorePerMinute": 0,
            "stabs": 0,
            "deaths": 0
          }
        },
        "dom": {
          "properties": {
            "kills": 648,
            "score": 603155,
            "timePlayed": 66087,
            "kdRatio": 1.2249527410207939,
            "captures": 138,
            "defends": 82,
            "scorePerMinute": 547.6008897362567,
            "deaths": 529
          }
        },
        "war": {
          "properties": {
            "kills": 220,
            "score": 95920,
            "timePlayed": 17758,
            "kdRatio": 1.0628019323671498,
            "assists": 66,
            "scorePerMinute": 324.0905507376957,
            "deaths": 207
          }
        },
        "hq": {
          "properties": {
            "kills": 239,
            "score": 149510,
            "timePlayed": 26868,
            "kdRatio": 1.0963302752293578,
            "captures": 30,
            "defends": 10,
            "scorePerMinute": 333.8767306833408,
            "deaths": 218
          }
        },
        "hc_dom": {
          "properties": {
            "kills": 0,
            "score": 0,
            "timePlayed": 0,
            "kdRatio": 0,
            "captures": 0,
            "defends": 0,
            "scorePerMinute": 0,
            "deaths": 0
          }
        },
        "hc_conf": {
          "properties": {
            "kills": 0,
            "score": 0,
            "timePlayed": 0,
            "kdRatio": 0,
            "confirms": 0,
            "scorePerMinute": 0,
            "denies": 0,
            "deaths": 0
          }
        },
        "koth": {
          "properties": {
            "kills": 7115,
            "score": 1736850,
            "timePlayed": 232847,
            "kdRatio": 1.1698454455771128,
            "defends": 949,
            "objTime": 22127,
            "scorePerMinute": 447.5513964105185,
            "deaths": 6082
          }
        },
        "conf": {
          "properties": {
            "kills": 14,
            "score": 234925,
            "timePlayed": 19087,
            "kdRatio": 1.5555555555555556,
            "confirms": 10,
            "scorePerMinute": 738.4869282757898,
            "denies": 5,
            "deaths": 9
          }
        },
        "hc_hq": {
          "properties": {
            "kills": 0,
            "score": 0,
            "timePlayed": 0,
            "kdRatio": 0,
            "captures": 0,
            "defends": 0,
            "scorePerMinute": 0,
            "deaths": 0
          }
        },
        "arena": {
          "properties": {
            "kills": 366,
            "score": 227650,
            "timePlayed": 62630,
            "damage": 45537,
            "kdRatio": 0.9581151832460733,
            "assists": 92,
            "scorePerMinute": 218.09037202618555,
            "deaths": 382
          }
        },
        "br_dmz": {
          "properties": {
            "wins": 0,
            "kills": 39,
            "kdRatio": 2.7857142857142856,
            "downs": 42,
            "topTwentyFive": 0,
            "topTen": 0,
            "contracts": 5,
            "revives": 0,
            "topFive": 0,
            "score": 22366,
            "timePlayed": 5308,
            "gamesPlayed": 4,
            "tokens": 0,
            "scorePerMinute": 252.81838733986436,
            "cash": 492,
            "deaths": 14
          }
        },
        "br": {
          "properties": {
            "wins": 20,
            "kills": 936,
            "kdRatio": 1.6193771626297577,
            "downs": 956,
            "topTwentyFive": 169,
            "topTen": 93,
            "contracts": 217,
            "revives": 28,
            "topFive": 56,
            "score": 933650,
            "timePlayed": 261365,
            "gamesPlayed": 231,
            "tokens": 0,
            "scorePerMinute": 214.3324469611463,
            "cash": 0,
            "deaths": 578
          }
        },
        "sd": {
          "properties": {
            "kills": 535,
            "score": 207860,
            "timePlayed": 140711,
            "kdRatio": 1.4266666666666667,
            "plants": 58,
            "scorePerMinute": 88.63272949520649,
            "defuses": 7,
            "deaths": 375
          }
        },
        "grnd": {
          "properties": {
            "kills": 0,
            "score": 2450,
            "timePlayed": 328,
            "kdRatio": 0,
            "defends": 0,
            "objTime": 0,
            "scorePerMinute": 448.1707317073171,
            "deaths": 0
          }
        },
        "cyber": {
          "properties": {
            "kills": 0,
            "score": 18295,
            "timePlayed": 11860,
            "kdRatio": 0,
            "plants": 0,
            "scorePerMinute": 92.55480607082632,
            "revives": 0,
            "deaths": 0
          }
        },
        "hc_war": {
          "properties": {
            "kills": 0,
            "score": 0,
            "timePlayed": 0,
            "kdRatio": 0,
            "assists": 0,
            "scorePerMinute": 0,
            "deaths": 0
          }
        },
        "br_all": {
          "properties": {
            "wins": 20,
            "kills": 975,
            "kdRatio": 1.6469594594594594,
            "downs": 998,
            "topTwentyFive": 169,
            "topTen": 93,
            "contracts": 222,
            "revives": 28,
            "topFive": 56,
            "score": 956016,
            "timePlayed": 266673,
            "gamesPlayed": 235,
            "tokens": 0,
            "scorePerMinute": 215.09849141082898,
            "cash": 492,
            "deaths": 592
          }
        },
        "hc_sd": {
          "properties": {
            "kills": 0,
            "score": 0,
            "timePlayed": 0,
            "kdRatio": 0,
            "plants": 0,
            "scorePerMinute": 0,
            "defuses": 0,
            "deaths": 0
          }
        },
        "arm": {
          "properties": {
            "kills": 32,
            "score": 6575,
            "timePlayed": 1685,
            "kdRatio": 2,
            "captures": 1,
            "defends": 1,
            "scorePerMinute": 234.1246290801187,
            "deaths": 16
          }
        },
        "hc_cyber": {
          "properties": {
            "kills": 0,
            "score": 0,
            "timePlayed": 0,
            "kdRatio": 0,
            "plants": 0,
            "scorePerMinute": 0,
            "revives": 0,
            "deaths": 0
          }
        },
        "infect": {
          "properties": {
            "kills": 27,
            "score": 8950,
            "infected": 7,
            "timePlayed": 1915,
            "kdRatio": 0.8709677419354839,
            "scorePerMinute": 280.4177545691906,
            "time": 1144,
            "deaths": 31
          }
        }
      },
      "map": {},
      "itemData": {
        "weapon_sniper": {
          "iw8_sn_alpha50": {
            "properties": {
              "hits": 411,
              "kills": 468,
              "kdRatio": 1.0960187353629978,
              "headshots": 105,
              "accuracy": 0.37027027027027026,
              "shots": 1110,
              "deaths": 427
            }
          },
          "iw8_sn_hdromeo": {
            "properties": {
              "hits": 32,
              "kills": 34,
              "kdRatio": 1.2592592592592593,
              "headshots": 10,
              "accuracy": 0.19161676646706588,
              "shots": 167,
              "deaths": 27
            }
          },
          "iw8_sn_delta": {
            "properties": {
              "hits": 18,
              "kills": 17,
              "kdRatio": 1.5454545454545454,
              "headshots": 5,
              "accuracy": 0.35294117647058826,
              "shots": 51,
              "deaths": 11
            }
          },
          "iw8_sn_xmike109": {
            "properties": {
              "hits": 1,
              "kills": 1,
              "kdRatio": 1,
              "headshots": 0,
              "accuracy": 0.25,
              "shots": 4,
              "deaths": 0
            }
          }
        },
        "tacticals": {
          "equip_gas_grenade": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          },
          "equip_snapshot_grenade": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          },
          "equip_decoy": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          },
          "equip_smoke": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          },
          "equip_concussion": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          },
          "equip_hb_sensor": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          },
          "equip_flash": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          },
          "equip_adrenaline": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          }
        },
        "lethals": {
          "equip_frag": {
            "properties": {
              "hits": 0,
              "kills": 162,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          },
          "equip_thermite": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          },
          "equip_semtex": {
            "properties": {
              "hits": 0,
              "kills": 322,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          },
          "equip_claymore": {
            "properties": {
              "hits": 0,
              "kills": 5,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          },
          "equip_c4": {
            "properties": {
              "hits": 0,
              "kills": 540,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          },
          "equip_at_mine": {
            "properties": {
              "hits": 0,
              "kills": 14,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          },
          "equip_throwing_knife": {
            "properties": {
              "hits": 0,
              "kills": 15,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          },
          "equip_molotov": {
            "properties": {
              "hits": 0,
              "kills": 3,
              "shots": 0,
              "deaths": 0,
              "headShots": 0
            }
          }
        },
        "weapon_lmg": {
          "iw8_lm_kilo121": {
            "properties": {
              "hits": 68,
              "kills": 18,
              "kdRatio": 1.5,
              "headshots": 2,
              "accuracy": 0.12781954887218044,
              "shots": 532,
              "deaths": 12
            }
          },
          "iw8_lm_mkilo3": {
            "properties": {
              "hits": 1,
              "kills": 0,
              "kdRatio": 0,
              "headshots": 0,
              "accuracy": 0.024390243902439025,
              "shots": 41,
              "deaths": 0
            }
          },
          "iw8_lm_mgolf34": {
            "properties": {
              "hits": 60,
              "kills": 17,
              "kdRatio": 1.1333333333333333,
              "headshots": 10,
              "accuracy": 0.1411764705882353,
              "shots": 425,
              "deaths": 15
            }
          },
          "iw8_lm_lima86": {
            "properties": {
              "hits": 52,
              "kills": 13,
              "kdRatio": 1.1818181818181819,
              "headshots": 3,
              "accuracy": 0.11206896551724138,
              "shots": 464,
              "deaths": 11
            }
          },
          "iw8_lm_pkilo": {
            "properties": {
              "hits": 99,
              "kills": 18,
              "kdRatio": 1.3846153846153846,
              "headshots": 6,
              "accuracy": 0.1658291457286432,
              "shots": 597,
              "deaths": 13
            }
          },
          "iw8_lm_sierrax": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "kdRatio": 0,
              "headshots": 0,
              "accuracy": 0,
              "shots": 0,
              "deaths": 0
            }
          },
          "iw8_lm_mgolf36": {
            "properties": {
              "hits": 1056,
              "kills": 226,
              "kdRatio": 1.1133004926108374,
              "headshots": 62,
              "accuracy": 0.18803418803418803,
              "shots": 5616,
              "deaths": 203
            }
          }
        },
        "weapon_launcher": {
          "iw8_la_gromeo": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "kdRatio": 0,
              "headshots": 0,
              "accuracy": 0,
              "shots": 3,
              "deaths": 0
            }
          },
          "iw8_la_rpapa7": {
            "properties": {
              "hits": 12,
              "kills": 220,
              "kdRatio": 1.164021164021164,
              "headshots": 2,
              "accuracy": 0.020477815699658702,
              "shots": 586,
              "deaths": 189
            }
          },
          "iw8_la_juliet": {
            "properties": {
              "hits": 30,
              "kills": 15,
              "kdRatio": 0.8823529411764706,
              "headshots": 0,
              "accuracy": 0.4225352112676056,
              "shots": 71,
              "deaths": 17
            }
          },
          "iw8_la_kgolf": {
            "properties": {
              "hits": 8,
              "kills": 6,
              "kdRatio": 0.3333333333333333,
              "headshots": 0,
              "accuracy": 0.22857142857142856,
              "shots": 35,
              "deaths": 18
            }
          },
          "iw8_la_mike32": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "kdRatio": 0,
              "headshots": 0,
              "accuracy": 0,
              "shots": 0,
              "deaths": 0
            }
          }
        },
        "weapon_pistol": {
          "iw8_pi_cpapa": {
            "properties": {
              "hits": 68,
              "kills": 50,
              "kdRatio": 1.8518518518518519,
              "headshots": 17,
              "accuracy": 0.3148148148148148,
              "shots": 216,
              "deaths": 27
            }
          },
          "iw8_pi_mike9": {
            "properties": {
              "hits": 11,
              "kills": 2,
              "kdRatio": 2,
              "headshots": 0,
              "accuracy": 0.1506849315068493,
              "shots": 73,
              "deaths": 0
            }
          },
          "iw8_pi_mike1911": {
            "properties": {
              "hits": 211,
              "kills": 62,
              "kdRatio": 0.8378378378378378,
              "headshots": 18,
              "accuracy": 0.2988668555240793,
              "shots": 706,
              "deaths": 74
            }
          },
          "iw8_pi_golf21": {
            "properties": {
              "hits": 597,
              "kills": 142,
              "kdRatio": 0.8352941176470589,
              "headshots": 29,
              "accuracy": 0.33166666666666667,
              "shots": 1800,
              "deaths": 170
            }
          },
          "iw8_pi_decho": {
            "properties": {
              "hits": 299,
              "kills": 149,
              "kdRatio": 0.7760416666666666,
              "headshots": 35,
              "accuracy": 0.4018817204301075,
              "shots": 744,
              "deaths": 192
            }
          },
          "iw8_pi_papa320": {
            "properties": {
              "hits": 76,
              "kills": 25,
              "kdRatio": 1.4705882352941178,
              "headshots": 3,
              "accuracy": 0.24203821656050956,
              "shots": 314,
              "deaths": 17
            }
          }
        },
        "weapon_assault_rifle": {
          "iw8_ar_falima": {
            "properties": {
              "hits": 42,
              "kills": 10,
              "kdRatio": 1.1111111111111112,
              "headshots": 2,
              "accuracy": 0.25609756097560976,
              "shots": 164,
              "deaths": 9
            }
          },
          "iw8_ar_tango21": {
            "properties": {
              "hits": 63,
              "kills": 9,
              "kdRatio": 2.25,
              "headshots": 1,
              "accuracy": 0.15555555555555556,
              "shots": 405,
              "deaths": 4
            }
          },
          "iw8_ar_mike4": {
            "properties": {
              "hits": 40888,
              "kills": 8833,
              "kdRatio": 1.2906195207481006,
              "headshots": 1625,
              "accuracy": 0.2519844204506237,
              "shots": 162264,
              "deaths": 6844
            }
          },
          "iw8_ar_anovember94": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "kdRatio": 0,
              "headshots": 0,
              "accuracy": 0,
              "shots": 0,
              "deaths": 0
            }
          },
          "iw8_ar_falpha": {
            "properties": {
              "hits": 127,
              "kills": 43,
              "kdRatio": 1.5357142857142858,
              "headshots": 10,
              "accuracy": 0.2255772646536412,
              "shots": 563,
              "deaths": 28
            }
          },
          "iw8_ar_mcharlie": {
            "properties": {
              "hits": 110,
              "kills": 17,
              "kdRatio": 2.125,
              "headshots": 4,
              "accuracy": 0.2249488752556237,
              "shots": 489,
              "deaths": 8
            }
          },
          "iw8_ar_akilo47": {
            "properties": {
              "hits": 72,
              "kills": 17,
              "kdRatio": 0.8095238095238095,
              "headshots": 4,
              "accuracy": 0.16628175519630484,
              "shots": 433,
              "deaths": 21
            }
          },
          "iw8_ar_kilo433": {
            "properties": {
              "hits": 949,
              "kills": 189,
              "kdRatio": 1.111764705882353,
              "headshots": 26,
              "accuracy": 0.22834456207892204,
              "shots": 4156,
              "deaths": 170
            }
          },
          "iw8_ar_scharlie": {
            "properties": {
              "hits": 32,
              "kills": 7,
              "kdRatio": 1,
              "headshots": 2,
              "accuracy": 0.17297297297297298,
              "shots": 185,
              "deaths": 7
            }
          },
          "iw8_ar_asierra12": {
            "properties": {
              "hits": 13,
              "kills": 4,
              "kdRatio": 0.6666666666666666,
              "headshots": 0,
              "accuracy": 0.14942528735632185,
              "shots": 87,
              "deaths": 6
            }
          },
          "iw8_ar_galima": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "kdRatio": 0,
              "headshots": 0,
              "accuracy": 0,
              "shots": 0,
              "deaths": 0
            }
          },
          "iw8_ar_sierra552": {
            "properties": {
              "hits": 89,
              "kills": 13,
              "kdRatio": 1.4444444444444444,
              "headshots": 0,
              "accuracy": 0.15397923875432526,
              "shots": 578,
              "deaths": 9
            }
          }
        },
        "weapon_other": {
          "iw8_me_riotshield": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "kdRatio": 0,
              "headshots": 0,
              "accuracy": 0,
              "shots": 0,
              "deaths": 10
            }
          }
        },
        "weapon_shotgun": {
          "iw8_sh_mike26": {
            "properties": {
              "hits": 23,
              "kills": 6,
              "kdRatio": 6,
              "headshots": 2,
              "accuracy": 0.5111111111111111,
              "shots": 45,
              "deaths": 0
            }
          },
          "iw8_sh_charlie725": {
            "properties": {
              "hits": 114,
              "kills": 65,
              "kdRatio": 1.0317460317460319,
              "headshots": 10,
              "accuracy": 0.75,
              "shots": 152,
              "deaths": 63
            }
          },
          "iw8_sh_oscar12": {
            "properties": {
              "hits": 162,
              "kills": 64,
              "kdRatio": 0.9142857142857143,
              "headshots": 5,
              "accuracy": 0.4835820895522388,
              "shots": 335,
              "deaths": 70
            }
          },
          "iw8_sh_romeo870": {
            "properties": {
              "hits": 186,
              "kills": 114,
              "kdRatio": 0.8321167883211679,
              "headshots": 20,
              "accuracy": 0.7181467181467182,
              "shots": 259,
              "deaths": 137
            }
          },
          "iw8_sh_dpapa12": {
            "properties": {
              "hits": 21,
              "kills": 16,
              "kdRatio": 1.4545454545454546,
              "headshots": 1,
              "accuracy": 0.6,
              "shots": 35,
              "deaths": 11
            }
          }
        },
        "weapon_smg": {
          "iw8_sm_mpapa7": {
            "properties": {
              "hits": 117,
              "kills": 23,
              "kdRatio": 1.7692307692307692,
              "headshots": 4,
              "accuracy": 0.222011385199241,
              "shots": 527,
              "deaths": 13
            }
          },
          "iw8_sm_augolf": {
            "properties": {
              "hits": 119,
              "kills": 27,
              "kdRatio": 1,
              "headshots": 2,
              "accuracy": 0.21636363636363637,
              "shots": 550,
              "deaths": 27
            }
          },
          "iw8_sm_papa90": {
            "properties": {
              "hits": 134,
              "kills": 29,
              "kdRatio": 2.6363636363636362,
              "headshots": 5,
              "accuracy": 0.2632612966601179,
              "shots": 509,
              "deaths": 11
            }
          },
          "iw8_sm_charlie9": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "kdRatio": 0,
              "headshots": 0,
              "accuracy": 0,
              "shots": 0,
              "deaths": 0
            }
          },
          "iw8_sm_mpapa5": {
            "properties": {
              "hits": 36408,
              "kills": 8190,
              "kdRatio": 1.10362484840318,
              "headshots": 1288,
              "accuracy": 0.2409849086576648,
              "shots": 151080,
              "deaths": 7421
            }
          },
          "iw8_sm_smgolf45": {
            "properties": {
              "hits": 19,
              "kills": 5,
              "kdRatio": 5,
              "headshots": 1,
              "accuracy": 0.1484375,
              "shots": 128,
              "deaths": 0
            }
          },
          "iw8_sm_beta": {
            "properties": {
              "hits": 103,
              "kills": 22,
              "kdRatio": 3.6666666666666665,
              "headshots": 5,
              "accuracy": 0.29178470254957506,
              "shots": 353,
              "deaths": 6
            }
          },
          "iw8_sm_victor": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "kdRatio": 0,
              "headshots": 0,
              "accuracy": 0,
              "shots": 0,
              "deaths": 0
            }
          },
          "iw8_sm_uzulu": {
            "properties": {
              "hits": 232,
              "kills": 48,
              "kdRatio": 0.7619047619047619,
              "headshots": 7,
              "accuracy": 0.22502424830261883,
              "shots": 1031,
              "deaths": 63
            }
          }
        },
        "weapon_marksman": {
          "iw8_sn_sbeta": {
            "properties": {
              "hits": 442,
              "kills": 281,
              "kdRatio": 0.8593272171253823,
              "headshots": 76,
              "accuracy": 0.4922048997772829,
              "shots": 898,
              "deaths": 327
            }
          },
          "iw8_sn_crossbow": {
            "properties": {
              "hits": 0,
              "kills": 1,
              "kdRatio": 1,
              "headshots": 0,
              "accuracy": 0,
              "shots": 9,
              "deaths": 0
            }
          },
          "iw8_sn_kilo98": {
            "properties": {
              "hits": 22,
              "kills": 22,
              "kdRatio": 1.2941176470588236,
              "headshots": 8,
              "accuracy": 0.19130434782608696,
              "shots": 115,
              "deaths": 17
            }
          },
          "iw8_sn_mike14": {
            "properties": {
              "hits": 24,
              "kills": 13,
              "kdRatio": 2.1666666666666665,
              "headshots": 2,
              "accuracy": 0.23529411764705882,
              "shots": 102,
              "deaths": 6
            }
          },
          "iw8_sn_sksierra": {
            "properties": {
              "hits": 5,
              "kills": 2,
              "kdRatio": 2,
              "headshots": 0,
              "accuracy": 0.3125,
              "shots": 16,
              "deaths": 0
            }
          }
        },
        "weapon_melee": {
          "iw8_me_akimboblunt": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "kdRatio": 0,
              "headshots": 0,
              "accuracy": 0,
              "shots": 0,
              "deaths": 0
            }
          },
          "iw8_me_akimboblades": {
            "properties": {
              "hits": 0,
              "kills": 0,
              "kdRatio": 0,
              "headshots": 0,
              "accuracy": 0,
              "shots": 0,
              "deaths": 0
            }
          },
          "iw8_knife": {
            "properties": {
              "hits": 0,
              "kills": 54,
              "kdRatio": 0.4251968503937008,
              "headshots": 0,
              "accuracy": 0,
              "shots": 0,
              "deaths": 127
            }
          }
        }
      },
      "scorestreakData": {
        "lethalScorestreakData": {
          "precision_airstrike": {
            "properties": {
              "extraStat1": 293,
              "uses": 298,
              "awardedCount": 313
            }
          },
          "cruise_predator": {
            "properties": {
              "extraStat1": 128,
              "uses": 151,
              "awardedCount": 185
            }
          },
          "manual_turret": {
            "properties": {
              "extraStat1": 0,
              "uses": 5,
              "awardedCount": 54
            }
          },
          "white_phosphorus": {
            "properties": {
              "extraStat1": 0,
              "uses": 0,
              "awardedCount": 0
            }
          },
          "hover_jet": {
            "properties": {
              "extraStat1": 399,
              "uses": 132,
              "awardedCount": 141
            }
          },
          "chopper_gunner": {
            "properties": {
              "extraStat1": 241,
              "uses": 35,
              "awardedCount": 35
            }
          },
          "gunship": {
            "properties": {
              "extraStat1": 0,
              "uses": 0,
              "awardedCount": 0
            }
          },
          "sentry_gun": {
            "properties": {
              "extraStat1": 1,
              "uses": 5,
              "awardedCount": 5
            }
          },
          "toma_strike": {
            "properties": {
              "extraStat1": 239,
              "uses": 324,
              "awardedCount": 335
            }
          },
          "nuke": {
            "properties": {
              "extraStat1": 0,
              "uses": 0,
              "awardedCount": 0
            }
          },
          "juggernaut": {
            "properties": {
              "extraStat1": 5,
              "uses": 1,
              "awardedCount": 1
            }
          },
          "pac_sentry": {
            "properties": {
              "extraStat1": 0,
              "uses": 0,
              "awardedCount": 0
            }
          },
          "chopper_support": {
            "properties": {
              "extraStat1": 2,
              "uses": 1,
              "awardedCount": 1
            }
          },
          "bradley": {
            "properties": {
              "extraStat1": 0,
              "uses": 0,
              "awardedCount": 0
            }
          }
        },
        "supportScorestreakData": {
          "airdrop": {
            "properties": {
              "extraStat1": 0,
              "uses": 0,
              "awardedCount": 0
            }
          },
          "radar_drone_overwatch": {
            "properties": {
              "extraStat1": 0,
              "uses": 19,
              "awardedCount": 22
            }
          },
          "scrambler_drone_guard": {
            "properties": {
              "extraStat1": 0,
              "uses": 3,
              "awardedCount": 8
            }
          },
          "uav": {
            "properties": {
              "extraStat1": 3560,
              "uses": 797,
              "awardedCount": 637
            }
          },
          "airdrop_multiple": {
            "properties": {
              "extraStat1": 0,
              "uses": 1,
              "awardedCount": 1
            }
          },
          "directional_uav": {
            "properties": {
              "extraStat1": 0,
              "uses": 1,
              "awardedCount": 0
            }
          }
        }
      },
      "accoladeData": {
        "properties": {
          "classChanges": 75,
          "highestAvgAltitude": 72,
          "killsFromBehind": 168,
          "lmgDeaths": 49,
          "riotShieldDamageAbsorbed": 8,
          "flashbangHits": 82,
          "meleeKills": 57,
          "tagsLargestBank": 0,
          "shotgunKills": 34,
          "sniperDeaths": 97,
          "timeProne": 168,
          "killstreakWhitePhosphorousKillsAssists": 0,
          "shortestLife": 92,
          "deathsFromBehind": 95,
          "higherRankedKills": 113,
          "mostAssists": 203,
          "leastKills": 70,
          "tagsDenied": 16,
          "killstreakWheelsonKills": 0,
          "sniperHeadshots": 56,
          "killstreakJuggernautKills": 1,
          "smokesUsed": 57,
          "avengerKills": 163,
          "decoyHits": 1,
          "killstreakCarePackageUsed": 0,
          "molotovKills": 1,
          "gasHits": 18,
          "comebackKills": 111,
          "lmgHeadshots": 35,
          "smgDeaths": 95,
          "carrierKills": 0,
          "deployableCoverUsed": 0,
          "thermiteKills": 1,
          "arKills": 188,
          "c4Kills": 0,
          "suicides": 38,
          "clutch": 2,
          "survivorKills": 0,
          "killstreakGunshipKills": 0,
          "timeSpentAsPassenger": 0,
          "returns": 0,
          "smgHeadshots": 144,
          "launcherDeaths": 1,
          "oneShotOneKills": 75,
          "ammoBoxUsed": 0,
          "spawnSelectSquad": 0,
          "weaponPickups": 97,
          "pointBlankKills": 133,
          "tagsCaptured": 20,
          "killstreakGroundKills": 2,
          "distanceTraveledInVehicle": 0,
          "longestLife": 102,
          "stunHits": 197,
          "spawnSelectFlag": 1,
          "shotgunHeadshots": 18,
          "bombDefused": 9,
          "snapshotHits": 1,
          "noKillsWithDeath": 5,
          "killstreakAUAVAssists": 0,
          "killstreakPersonalUAVKills": 3,
          "tacticalInsertionSpawns": 3,
          "launcherKills": 2,
          "spawnSelectVehicle": 0,
          "mostKillsLeastDeaths": 50,
          "mostKills": 195,
          "defends": 162,
          "timeSpentAsDriver": 0,
          "bombDetonated": 2,
          "arHeadshots": 179,
          "timeOnPoint": 98,
          "lmgKills": 50,
          "killstreakUAVAssists": 93,
          "carepackagesCaptured": 3,
          "mostKillsLongestStreak": 104,
          "killstreakCruiseMissileKills": 57,
          "longestStreak": 215,
          "destroyedKillstreaks": 27,
          "hipfireKills": 141,
          "stimDamageHealed": 2,
          "skippedKillcams": 87,
          "leastAssists": 187,
          "mostMultikills": 204,
          "highestRankedKills": 202,
          "killstreakAirstrikeKills": 75,
          "distanceTravelled": 107,
          "killstreakKills": 144,
          "semtexKills": 104,
          "penetrationKills": 189,
          "explosionsSurvived": 127,
          "highestMultikill": 317,
          "arDeaths": 138,
          "longshotKills": 183,
          "proximityMineKills": 3,
          "tagsMegaBanked": 4,
          "mostKillsMostHeadshots": 68,
          "firstInfected": 0,
          "killstreakCUAVAssists": 1,
          "throwingKnifeKills": 7,
          "executionKills": 31,
          "lastSurvivor": 1,
          "reconDroneMarks": 2,
          "deadSilenceKills": 74,
          "revengeKills": 146,
          "infectedKills": 1,
          "killEnemyTeam": 198,
          "sniperKills": 84,
          "killstreakCluserStrikeKills": 86,
          "meleeDeaths": 40,
          "timeWatchingKillcams": 67,
          "killstreakTankKills": 0,
          "noKillNoDeath": 5,
          "shotgunDeaths": 73,
          "killstreakChopperGunnerKills": 27,
          "shotsFired": 95,
          "stoppingPowerKills": 0,
          "pistolPeaths": 86,
          "killstreakShieldTurretKills": 0,
          "timeCrouched": 53,
          "noDeathsFromBehind": 895,
          "bombPlanted": 17,
          "setbacks": 0,
          "smgKills": 146,
          "claymoreKills": 3,
          "kills10NoDeaths": 1,
          "pistolHeadshots": 58,
          "killstreakVTOLJetKills": 71,
          "headshots": 195,
          "mostDeaths": 90,
          "adsKills": 198,
          "empDroneHits": 14,
          "defenderKills": 174,
          "launcherHeadshots": 3,
          "timesSelectedAsSquadLeader": 0,
          "killstreakAirKills": 147,
          "assaults": 0,
          "fragKills": 77,
          "killstreakEmergencyAirdropUsed": 0,
          "captures": 206,
          "killstreakChopperSupportKills": 1,
          "spawnSelectBase": 0,
          "noKill10Deaths": 0,
          "leastDeaths": 152,
          "killstreakSentryGunKills": 1,
          "longestTimeSpentOnWeapon": 0,
          "lowerRankedKills": 183,
          "trophySystemHits": 74,
          "clutchRevives": 0,
          "lowestAvgAltitude": 88,
          "pickups": 0,
          "pistolKills": 130,
          "reloads": 126
        }
      }
    },
    "weekly": {
      "all": {
        "properties": {
          "kills": 75,
          "medalXp": 7495,
          "matchXp": 9099,
          "averageSpeedDuringMatch": 815.1628900000001,
          "scoreXp": 8850,
          "accuracy": 0.2408980582524272,
          "losses": 4,
          "wallBangs": 2,
          "avgLifeTime": 25.5,
          "shotsLanded": 397,
          "objectiveMedalModeXAssaultScore": 9,
          "objectiveMedalModeXDefendScore": 6,
          "score": 12370,
          "totalXp": 25444,
          "headshots": 14,
          "assists": 25,
          "objectiveMedalModeHpSecureScore": 12,
          "rank": 5,
          "scorePerMinute": 316.3682864450128,
          "distanceTraveled": 35436.8364,
          "deaths": 87,
          "wins": 1,
          "kdRatio": 0.8620689655172413,
          "shotsMissed": 1251,
          "scorePerGame": 2474,
          "timePlayed": 2346,
          "headshotPercentage": 0.18666666666666668,
          "executions": 0,
          "matchesPlayed": 5,
          "suicides": 0,
          "seasonRank": 0,
          "objectiveKothInObj": 172,
          "wlRatio": 0.25,
          "nearmisses": 909,
          "percentTimeMoving": 384.58058,
          "miscXp": 0,
          "longestStreak": 5,
          "damageDone": 10477,
          "shotsFired": 1648,
          "damageTaken": 10478
        }
      },
      "mode": {
        "koth": {
          "properties": {
            "kills": 75,
            "medalXp": 7495,
            "matchXp": 9099,
            "averageSpeedDuringMatch": 815.1628900000001,
            "scoreXp": 8850,
            "accuracy": 0.2408980582524272,
            "wallBangs": 2,
            "losses": 4,
            "avgLifeTime": 25.5,
            "shotsLanded": 397,
            "objectiveMedalModeXAssaultScore": 9,
            "objectiveMedalModeXDefendScore": 6,
            "score": 12370,
            "totalXp": 25444,
            "headshots": 14,
            "assists": 25,
            "objectiveMedalModeHpSecureScore": 12,
            "rank": 5,
            "scorePerMinute": 316.3682864450128,
            "distanceTraveled": 35436.8364,
            "deaths": 87,
            "wins": 1,
            "kdRatio": 0.8620689655172413,
            "shotsMissed": 1251,
            "scorePerGame": 2474,
            "timePlayed": 2346,
            "headshotPercentage": 0.18666666666666668,
            "matchesPlayed": 5,
            "executions": 0,
            "suicides": 0,
            "seasonRank": 0,
            "objectiveKothInObj": 172,
            "wlRatio": 0.25,
            "nearmisses": 909,
            "percentTimeMoving": 384.58058,
            "miscXp": 0,
            "longestStreak": 5,
            "damageDone": 10477,
            "shotsFired": 1648,
            "damageTaken": 10478
          }
        }
      },
      "map": {}
    },
    "engagement": null
  }
  ```
</details>

---

## :satellite:Real-time events
I am making use of the following real-time events, created by socket.io: 

### :computer: Connection
when the user makes a connection he has to be added to a team and the chatbot will notice other user that someone has joined the chat. 

### :computer: Disconnect
when the user disconnects, he has to be removed from the teams and the chatbot will send a message saying he left the chat. 

### :clipboard: AddTeamMember
adds the current user to the custom team.

### :clipboard: RemoveTeamMember
removes the current user from the custom team.

### :clipboard: teamChange
Everytime a user connects/disconnects, new teams will be formed with all users, depending on thier KD ratio.

### :speech_balloon: Message
handles the messages between server and clients.

### :speech_balloon: joinChat
User joins the chat, online count needs to go up.

### :speech_balloon: leaveChat
User leaves the chat, online count needs to go down.

### :no_entry_sign: Offline
The client polls every second if the socket is still available and disables input when it's not. Browser will refresh when the connection comes back to get the correct real-time events going again.

---

## :arrows_clockwise: Data flowchart
![data-flowchart](https://user-images.githubusercontent.com/60625329/114560791-494bba00-9c6d-11eb-8665-4c08d99be57a.png)

## :package: NPM packages
Discriptions are from the websites given or written by me when not existing.

### Call-of-duty-api
[Call-of-duty-api](https://www.npmjs.com/package/call-of-duty-api) is a promised based wrapper for the "private" API that Activision use on the callofduty.com website.

### Dotenv
[Dotenv](https://www.npmjs.com/package/dotenv) is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

### Ejs
[Ejs](https://www.npmjs.com/package/ejs) is a template engine used to create dynamic web pages.

### Express
[Express](https://www.npmjs.com/package/express) is a small framework used to create node servers, making routing easier to setup and use.

### Mongodb
[Mongodb](https://www.npmjs.com/package/mongodb) is an online database used to store and collect JSON. 

### Nodemon
[Nodemon](https://www.npmjs.com/package/nodemon) is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
### Socket.IO
[ Socket.IO](https://www.npmjs.com/package/socket.io) enables real-time bidirectional event-based communication

### EsLint
[ESLint](https://www.npmjs.com/package/eslint) is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code
