import { useState, useMemo, useEffect, useCallback } from "react";

const ALL_QUESTIONS = [{"number":1,"question":"Why should I read and understand God’s Word?","answer":"It will teach me how to RUN after God.","reference":"(Habakkuk 2:2)","points":10},{"number":2,"question":"When should I start learning God’s Word?","answer":"As a child","reference":"(Deuteronomy 6:7; II Timothy 3:15)","points":10},{"number":3,"question":"What can make me wise unto salvation?","answer":"The Holy Scriptures","reference":"(II Timothy 3:15)","points":10},{"number":4,"question":"What does Jesus call me if I am obedient to God’s Word?","answer":"He calls me a wise man who builds his house upon a rock.","reference":"(Matthew 7:24)","points":10},{"number":5,"question":"What does Jesus call me if I am disobedient to God’s Word?","answer":"He calls me a foolish man who builds his house upon the sand.","reference":"(Matthew 7:26)","points":10},{"number":6,"question":"Give two other names used to refer to the Bible.","answer":"The Holy Scriptures\nThe Law","reference":"(II Timothy 3:15)(Joshua 1:8; I Corinthians 14:21)","points":10},{"number":7,"question":"What does “inspired” mean?","answer":"“Inspired” means to be moved or carried, just like a sail boat is moved or carried by the wind.","reference":"(II Peter 1:21; II Timothy 3:16)","points":10},{"number":8,"question":"What does “prophet” mean?","answer":"A man inspired by God to give a message from God.","reference":"(Numbers 12:6)","points":10},{"number":9,"question":"What is the Trinity?","answer":"God the Father\nGod the Son\nGod the Holy Spirit","reference":"(I John 5:7)","points":10},{"number":10,"question":"The Old Testament was written in what language?","answer":"Hebrew","reference":"","points":10},{"number":11,"question":"What is a testament?","answer":"A binding agreement","reference":"","points":10},{"number":12,"question":"How many books are in the Bible?","answer":"66 books: 39 in the Old Testament and 27 in the New Testament","reference":"","points":10},{"number":13,"question":"The New Testament was written in what language?","answer":"Greek","reference":"","points":10},{"number":14,"question":"What are the four Gospels in the New Testament?","answer":"Matthew\nMark\nLuke\nJohn","reference":"","points":10},{"number":15,"question":"What does “gospel” mean?","answer":"Good news","reference":"(Matthew 4:23)","points":10},{"number":16,"question":"What is the historical book found in the New Testament?","answer":"Acts of the Apostles","reference":"","points":10},{"number":17,"question":"What is an epistle in the Bible?","answer":"A letter written to the church by an apostle","reference":"","points":10},{"number":18,"question":"What is an apostle?","answer":"A messenger sent from God used to perfect God’s people.","reference":"(Ephesians 4:11-13)","points":10},{"number":19,"question":"What is the prophetical book in the New Testament?","answer":"Revelation","reference":"","points":10},{"number":20,"question":"QUOTATION QUESTION. Quote the most important verse of the Bible.","answer":"In the beginning God created the heaven and the earth.","reference":"(Genesis 1:1)","points":10},{"number":21,"question":"What does the earth represent in the Bible?","answer":"My heart","reference":"(Deuteronomy 32:1; Micah 1:2; Hebrews 6:7-9)","points":10},{"number":22,"question":"When is the first day of Creation complete in my life?","answer":"When there is a separation between light and darkness in my life","reference":"(II Corinthians 4:6)","points":10},{"number":23,"question":"What is the first feast of the Lord?","answer":"The Passover","reference":"(Exodus 12:1-14, 42)","points":10},{"number":24,"question":"What is the first step in the tabernacle?","answer":"The door","reference":"(Exodus 26:36)","points":10},{"number":25,"question":"According to Hebrews eleven, who is the first man of faith?","answer":"Abel","reference":"(Hebrews 11:4)","points":10},{"number":26,"question":"What is the second feast of the Lord?","answer":"The Feast of Unleavened Bread","reference":"(Exodus 12:17-18, 39)","points":10},{"number":27,"question":"What does leavened bread represent in the Bible?","answer":"False thoughts and ideas (doctrine)","reference":"(Matthew 16:12)","points":10},{"number":28,"question":"What does unleavened bread represent in the Bible?","answer":"The truth, the Word of God","reference":"(John 6:48, 63)","points":10},{"number":29,"question":"What is the second step in the tabernacle?","answer":"The laver","reference":"(Exodus 30:18; 38:8)","points":10},{"number":30,"question":"What does the laver, made with mirrors, represent in the Bible?","answer":"The Word of God","reference":"(James 1:22-24)","points":10},{"number":31,"question":"According to Hebrews eleven, who is the second man of faith?","answer":"Enoch","reference":"(Hebrews 11:5)","points":10},{"number":32,"question":"What is the most important fruit of the Spirit?","answer":"Love","reference":"(I Corinthians 13:1-13)","points":10},{"number":33,"question":"What is the third feast of the Lord?","answer":"The Feast of First Fruits","reference":"(Leviticus 23:9-14)","points":10},{"number":34,"question":"What is the third step in the tabernacle?","answer":"The brazen altar","reference":"(Exodus 39:39)","points":10},{"number":35,"question":"According to Hebrews eleven, who is the third man of faith?","answer":"Noah","reference":"(Hebrews 11:7)","points":10},{"number":36,"question":"What does the sun represent in the Bible?","answer":"Jesus, the Sun of Righteousness","reference":"(Malachi 4:2)","points":10},{"number":37,"question":"What does the moon, reflecting the light of the sun, represent in the Bible?","answer":"The church, reflecting the light and glory of Jesus","reference":"(Isaiah 30:26)","points":10},{"number":38,"question":"What do the stars represent in the Bible?","answer":"God’s messengers","reference":"(Revelation 1:20)","points":10},{"number":39,"question":"What is the fourth feast of the Lord?","answer":"The Feast of Pentecost","reference":"(Leviticus 23:15-21; Acts 2:1; 20:16)","points":10},{"number":40,"question":"What is the fourth step in the tabernacle?","answer":"The candlestick","reference":"(Exodus 25:31)","points":10},{"number":41,"question":"According to Hebrews eleven, who is the fourth man of faith?","answer":"Abraham","reference":"(Hebrews 11:8)","points":10},{"number":42,"question":"What is the fifth feast of the Lord?","answer":"The Feast of Trumpets","reference":"(Leviticus 23:23-25)","points":10},{"number":43,"question":"What is the fifth step in the tabernacle?","answer":"The table of shewbread","reference":"(Exodus 25:23-30)","points":10},{"number":44,"question":"According to Hebrews eleven, who is the fifth man of faith?","answer":"Isaac","reference":"(Hebrews 11:9)","points":10},{"number":45,"question":"What is the sixth feast of the Lord?","answer":"The Feast of Atonement","reference":"(Leviticus 23:27-32)","points":10},{"number":46,"question":"What is the sixth step in the tabernacle?","answer":"The altar of incense","reference":"(Exodus 30:27; 37:25-28)","points":10},{"number":47,"question":"According to Hebrews eleven, who is the sixth man of faith?","answer":"Jacob","reference":"(Hebrews 11:9)","points":10},{"number":48,"question":"What did God do on the seventh day of Creation?","answer":"He rested.","reference":"(Genesis 2:2)","points":10},{"number":49,"question":"According to Hebrews, what will happen if I believe God’s Word?","answer":"I will enter into His rest.","reference":"(Hebrews 4:3)","points":10},{"number":50,"question":"What is the seventh feast of the Lord?","answer":"The Feast of Tabernacles","reference":"(Leviticus 23:33-43)","points":10},{"number":51,"question":"What is the seventh step in the tabernacle?","answer":"The ark of the covenant","reference":"(Exodus 25:10-22; Hebrews 9:4)","points":10},{"number":52,"question":"According to Hebrews eleven, who is the seventh man of faith?","answer":"Joseph","reference":"(Hebrews 11:22)","points":10},{"number":53,"question":"What mistake did Adam make in the garden?","answer":"He loved Eve more than God.","reference":"(Luke 14:26; I Timothy 2:14)","points":10},{"number":54,"question":"Why did Adam and Eve cover themselves with fig leaves?","answer":"To try and hide their sin","reference":"(Genesis 3:7-8)","points":10},{"number":55,"question":"How did God provide an effective covering for Adam and Eve?","answer":"He made coats of skins, and clothed them.","reference":"(Genesis 3:21)","points":10},{"number":56,"question":"When Adam and Eve sinned, who did God judge first?","answer":"The serpent","reference":"(Genesis 3:14)","points":10},{"number":57,"question":"When Adam and Eve sinned, who did God judge second?","answer":"God Himself","reference":"(Genesis 3:15)","points":10},{"number":58,"question":"When Adam and Eve sinned, what judgment did God take upon Himself?","answer":"He would give His only Son to die on the cross for my sins.","reference":"(Genesis 3:15; John 3:16; 10:11)","points":10},{"number":59,"question":"What promise, or covenant, did God make with Adam?","answer":"That He would send a Savior","reference":"(Genesis 3:15)","points":10},{"number":60,"question":"What was the name of Adam and Eve’s first son?","answer":"Cain","reference":"(Genesis 4:1)","points":10},{"number":61,"question":"What was the name of Adam and Eve’s second son?","answer":"Abel","reference":"(Genesis 4:2)","points":10},{"number":62,"question":"What lesson do I learn from Cain’s offering?","answer":"I cannot draw near to God my way.\nI must draw near His way.","reference":"(Genesis 4:3-7)","points":10},{"number":63,"question":"Why was Abel’s sacrifice more excellent than Cain’s?","answer":"By faith (by hearing a word from God and obeying), Abel offered his sacrifice unto God.","reference":"(Hebrews 11:4)","points":10},{"number":64,"question":"Why did Cain kill his brother?","answer":"(I John 3:12)","reference":"","points":10},{"number":65,"question":"What is faith?","answer":"Faith is believing and trusting God in such a way that it leads me to obedience.","reference":"(James 2:18-20)","points":10},{"number":66,"question":"How can I receive faith?","answer":"(Romans 10:17)","reference":"","points":10},{"number":67,"question":"Without faith, it is impossible to do what?","answer":"Please God","reference":"(Hebrews 11:6)","points":10},{"number":68,"question":"By faith, I can believe what?","answer":"That God exists, and that he is a rewarder of them that diligently seek him.","reference":"(Hebrews 11:6)","points":10},{"number":69,"question":"What was Enoch’s testimony?","answer":"That he pleased God","reference":"(Hebrews 11:5)","points":10},{"number":70,"question":"According to Hebrews, what man never saw death?","answer":"Enoch","reference":"(Hebrews 11:5)","points":10},{"number":71,"question":"Jesus compares my days (the days of Jesus’ return) with the days of whom?","answer":"Noah and Lot","reference":"(Matthew 24:37-42; Luke 17:26-28)","points":10},{"number":72,"question":"What is the ark a figure of?","answer":"The church","reference":"(Genesis 6:14-16; I John 2:13-14; IMH Genesis II course, pages 10-13)","points":10},{"number":73,"question":"QUOTATION QUESTION. According to Matthew, who shall be saved in the end?","answer":"But he that shall endure unto the end, the same shall be saved.","reference":"(Matthew 24:13)","points":10},{"number":74,"question":"God called Abram to take what journey?","answer":"A journey from Ur of the Chaldees to the land of Canaan","reference":"(Genesis 11:27-12:5)","points":10},{"number":75,"question":"What brother of Abram did not journey to Canaan?","answer":"Nahor","reference":"(Genesis 11:27; 12:1-5)","points":10},{"number":76,"question":"What does Nahor mean?","answer":"Snorer","reference":"(Genesis 11:27)","points":10},{"number":77,"question":"According to Proverbs, what is characteristic of a lazy person?","answer":"He spends too much time sleeping.","reference":"(Proverbs 6:9-11)","points":10},{"number":78,"question":"QUOTATION QUESTION. Why is it hard for a lazy man to change his ways?","answer":"The lazy man is wiser in his own eyes than seven men who can answer sensibly.","reference":"(NKJV Proverbs 26:16)","points":10},{"number":79,"question":"Who will inherit the promise that God made to Abraham?","answer":"Those who have the faith of Abraham","reference":"(Romans 4:16; Galatians 3:29)","points":10},{"number":80,"question":"How can I receive the faith of Abraham?","answer":"By building altars (places of worship and prayer) and having meetings with God","reference":"(Genesis 12:7-8; 13:18; 15:1; 17:1; 18:1; 22:9)","points":10},{"number":81,"question":"What does Abram mean?","answer":"Arrogant (proud) father","reference":"(Genesis 11:26)","points":10},{"number":82,"question":"What does Sarai mean?","answer":"One who dominates","reference":"(Genesis 11:29)","points":10},{"number":83,"question":"What altar does God want me to build for Him every day?","answer":"An altar of worship and prayer","reference":"(Exodus 29:42-44; Psalm 141:2; Hebrews 13:15)","points":10},{"number":84,"question":"According to Psalm 25, who does God guide?","answer":"The meek","reference":"(Psalm 25:9)","points":10},{"number":85,"question":"What does the New Testament tell us that Abraham gave Melchisedec (priest of the most high God)?","answer":"Tithes","reference":"(Hebrews 7:2, 4)","points":10},{"number":86,"question":"What was the guarantee that God gave to Abram?","answer":"The cross and the grace of God","reference":"(Genesis 15:7-21)","points":10},{"number":87,"question":"What is grace?","answer":"The divine ability given of God to obey His commandments","reference":"(Romans 1:5)","points":10},{"number":88,"question":"What was the hope of every man of faith?","answer":"That their lives would bring forth Jesus, the promised Son","reference":"(Luke 1:26-55; 2:25-32, 36-38; John 1:41, 45-46)","points":10},{"number":89,"question":"What new name did God give to Abram?","answer":"Abraham","reference":"(Genesis 17:5)","points":10},{"number":90,"question":"What new name did God give to Sarai?","answer":"Sarah","reference":"(Genesis 17:15)","points":10},{"number":91,"question":"QUOTATION QUESTION. As a child of Abraham, what does God say to me?","answer":"I am the Almighty God; Walk before me, and be thou perfect.","reference":"(Genesis 17:1)","points":10},{"number":92,"question":"QUOTATION QUESTION. Does God care if I make friends with the world?","answer":"Whosoever therefore will be a friend of the world is the enemy of God.","reference":"(James 4:4)","points":10},{"number":93,"question":"What did Abraham do with Ishmael after Isaac was weaned?","answer":"He cast Ishmael out of his house.","reference":"(Genesis 21:8-14)","points":10},{"number":95,"question":"Abraham is a figure of whom?","answer":"The heavenly Father","reference":"(Genesis 22:2; John 3:16; Romans 4:16; Hebrews 11:17; I John 4:9)","points":10},{"number":96,"question":"Isaac is a figure of whom?","answer":"The promised Son of God","reference":"(Genesis 22:2; John 3:16; Romans 4:16-25; Hebrews 11:17)","points":10},{"number":97,"question":"QUOTATION QUESTION. What needs to happen once Jesus is born in my heart?","answer":"He must increase, but I must decrease.","reference":"(John 3:30)","points":10},{"number":98,"question":"How did Abraham respond when God asked him to offer up Isaac?","answer":"He rose up early in the morning to obey all that God had asked of him.","reference":"(Genesis 22:1-3)","points":10},{"number":99,"question":"Rebekah, Isaac’s wife, is a figure of whom?","answer":"The church, the bride of the Son of God","reference":"(Genesis 24; John 3:16; Romans 4:16-25; Hebrews 11:17)","points":10},{"number":100,"question":"What did the ten camels represent for Rebekah?","answer":"Ten trials (difficulties)","reference":"(Genesis 24:10-21)","points":10},{"number":101,"question":"What did Rebekah do for the camels?","answer":"She drew water out of the well and gave them to drink.","reference":"(Genesis 24:19-20)","points":10},{"number":102,"question":"What did the camels do for Rebekah after she gave them water?","answer":"They carried her through the desert to her husband, Isaac.","reference":"(Genesis 24:61-64)","points":10},{"number":103,"question":"What happens to trials (difficulties) when God’s presence is flowing (the water from the well)?","answer":"They seem like nothing.","reference":"(Genesis 24:11; Zechariah 4:7; Matthew 21:21)","points":10},{"number":104,"question":"","answer":"Jacob and Esau","reference":"(Genesis 25:24-26)","points":10},{"number":105,"question":"The Bible compares the righteous to what?","answer":"Sheep","reference":"(Psalm 95:7; 100:3)","points":10},{"number":106,"question":"The Bible compares the wicked to what?","answer":"Swine (pigs)","reference":"(Matthew 7:6; II Peter 2:20-22)","points":10},{"number":107,"question":"What blessing was promised to Jacob before birth?","answer":"The promise that God made to Abraham","reference":"(Genesis 25:22-23)","points":10},{"number":108,"question":"What blessing was Jacob hoping to receive when he deceived his father?","answer":"The promise that God made to Abraham","reference":"(Genesis 12:1-3; 25:22-23; 27:6-19; 28:1-4; 12-15)","points":10},{"number":109,"question":"What blessing did Jacob receive when he deceived his father?","answer":"Esau’s blessing","reference":"(Genesis 27:28-29, 28:1-4)","points":10},{"number":110,"question":"What happened when Jacob tried to obtain God’s promise his way instead of God’s?","answer":"He received a lifetime of consequences.","reference":"(Genesis 27-45)","points":10},{"number":111,"question":"Where did Jacob receive the promise of Abraham?","answer":"In Bethel, where he had a dream and a meeting with God","reference":"(Genesis 28:10-22)","points":10},{"number":112,"question":"What new name did God give to Jacob?","answer":"Israel","reference":"(Genesis 32:28)","points":10},{"number":113,"question":"What is one of the names of Jesus?","answer":"Israel","reference":"(Hosea 11:1; Matthew 2:15)","points":10},{"number":114,"question":"Why did Joseph’s brothers sell him as a slave?","answer":"They were filled with envy.\nThey wanted all of the inheritance for themselves.","reference":"(Acts 7:9)","points":10},{"number":115,"question":"Whose idea was it to sell Joseph as a slave?","answer":"Judah’s","reference":"(Genesis 37:26-27)","points":10},{"number":116,"question":"Why did Joseph prosper both in Potiphar’s house and in prison?","answer":"The Lord was with him.","reference":"(Genesis 39:2, 21)","points":10},{"number":117,"question":"Why was Joseph placed in prison?","answer":"He fled from Mrs. Potiphar when she wanted him to do what was wrong.","reference":"(Genesis 39:10-12, 19-20)","points":10},{"number":118,"question":"How did Joseph respond when he was unfairly placed with both Potiphar and the keeper of the prison?","answer":"He became their servant and diligently accomplished all that they asked.","reference":"(Genesis 39:4; 22-23)","points":10},{"number":119,"question":"What should our attitude be towards work?","answer":"Ecclesiastes says that whatever I do, I should do it with all my might.","reference":"(Ecclesiastes 9:10)","points":10},{"number":120,"question":"What kept Joseph in the dungeon?","answer":"The word of the Lord","reference":"(Psalm 105:17-19)","points":10},{"number":121,"question":"When and how was Joseph brought out of the dungeon?","answer":"As soon as God’s work had been completed, he was brought out quickly.","reference":"(NKJV Genesis 41:14; Psalm 105:19)","points":10},{"number":122,"question":"How did Joseph answer Pharaoh’s request to interpret his dream?","answer":"It is not in me: God shall give Pharaoh an answer of peace.","reference":"(Genesis 41:16)","points":10},{"number":123,"question":"Why did Pharaoh believe Joseph’s interpretation?","answer":"The presence of God that rested on Joseph’s life gave Pharaoh peace.","reference":"(Genesis 41:16)","points":10},{"number":124,"question":"What was the name of Joseph’s oldest son?","answer":"Manasseh","reference":"(Genesis 41:51)","points":10},{"number":125,"question":"What was the name of Joseph’s youngest son?","answer":"Ephraim","reference":"(Genesis 41:52)","points":10},{"number":126,"question":"Who did Joseph keep in prison and why?","answer":"Simeon, because he was the oldest brother responsible for Joseph when he was sold as a slave","reference":"(Genesis 37:19-22, 29; 42:22, 24)","points":10},{"number":127,"question":"What did Joseph’s brothers do when the silver cup was found in Benjamin’s sack?","answer":"They tore their clothes.","reference":"(NKJV Genesis 44:13)","points":10},{"number":128,"question":"What did Joseph find in his brothers?","answer":"That they had grown in God and had true love for one another","reference":"(Genesis 42-45)","points":10},{"number":129,"question":"How did Judah respond when Benjamin was going to be taken as a slave?","answer":"He pleaded to be allowed to stay in Benjamin’s place.","reference":"(Genesis 44:33-34)","points":10},{"number":130,"question":"What does Moses mean?","answer":"Rescued from the waters","reference":"(Exodus 2:10)","points":10},{"number":131,"question":"What was the name of Moses’ sister?","answer":"Miriam","reference":"(Exodus 15:20)","points":10},{"number":132,"question":"What is Satan’s goal?","answer":"To keep me in slavery and in hard bondage to sin","reference":"(Exodus 1:14; 5:8-9; Hebrews 2:14-15)","points":10},{"number":133,"question":"What does Egypt represent?","answer":"The world and my life in the world before coming to know Jesus as my Savior","reference":"(Exodus 12:13; Titus 3:3-7)","points":10},{"number":134,"question":"Who does Pharaoh represent?","answer":"Satan","reference":"(Ezekiel 31:2-18)","points":10},{"number":135,"question":"What was God’s calling for Moses?","answer":"To be the children of Israel’s ruler and savior","reference":"(Acts 7:25, 35)","points":10},{"number":136,"question":"What did Moses refuse?","answer":"To be called the son of Pharaoh’s daughter","reference":"(Hebrews 11:24)","points":10},{"number":137,"question":"What was the name of Moses’ oldest son?","answer":"Gershom","reference":"(Exodus 2:22)","points":10},{"number":138,"question":"What was the name of Moses’ youngest son?","answer":"Eliezer","reference":"(Exodus 18:4)","points":10},{"number":139,"question":"Who does God dwell with and who does He revive?","answer":"The humble","reference":"(Isaiah 57:15)","points":10},{"number":140,"question":"What was the name of Moses’ brother?","answer":"Aaron","reference":"(Exodus 4:14)","points":10},{"number":141,"question":"QUOTATION QUESTION. According to Philippians, how should I make my requests known unto God?","answer":"With thanksgiving, let your requests be made known unto God.","reference":"(Philippians 4:6)","points":10},{"number":142,"question":"How did Pharaoh respond when he heard God’s voice?","answer":"He hardened his heart.","reference":"(Exodus 8:15, 32; 9:34)","points":10},{"number":143,"question":"What happened when Pharaoh chose to harden his heart?","answer":"GOD hardened his heart.","reference":"(Exodus 9:12; 10:1; 11:10)","points":10},{"number":144,"question":"How should I respond when I hear God’s voice?","answer":"Quickly, humbly, and without hardening my heart","reference":"(Psalm 95:6-11; Hebrews 3:7-8, 15; 4:7)","points":10},{"number":145,"question":"QUOTATION QUESTION. Whom does God resist?","answer":"God resists the proud, But gives grace to the humble.","reference":"(NKJV I Peter 5:5)","points":10},{"number":146,"question":"When did Pharaoh ask to be delivered from the frogs?","answer":"Tomorrow","reference":"(Exodus 8:9-10)","points":10},{"number":147,"question":"What does “repentance” mean?","answer":"A change of attitude and direction where I turn away from sin and turn towards God","reference":"(Ezekiel 14:6; 18:30; Acts 3:19; Revelation 2:5)","points":10},{"number":148,"question":"What leads me to repentance?","answer":"The goodness of God","reference":"(Romans 2:4)","points":10},{"number":149,"question":"What is essential for survival in the desert?","answer":"Water","reference":"(Isaiah 44:3)","points":10},{"number":150,"question":"The children of Israel are a figure of what?","answer":"The church of God","reference":"(I Corinthians 10:1-11)","points":10},{"number":151,"question":"What does the journey of the children of Israel represent?","answer":"My journey with the Lord","reference":"(I Corinthians 10:1-11)","points":10},{"number":152,"question":"God gives the inheritance to what kind of people?","answer":"The humble","reference":"(Deuteronomy 8:16; Zephaniah 3:12-17)","points":10},{"number":153,"question":"How did God use the pillar of cloud?","answer":"To lead the way","reference":"(Exodus 13:21-22)","points":10},{"number":154,"question":"How did God use the pillar of fire?","answer":"To give light","reference":"(Exodus 13:21-22)","points":10},{"number":155,"question":"The crossing of the Red Sea is a figure of what?","answer":"Water baptism","reference":"(I Corinthians 10:1-2; Colossians 2:11-12)","points":10},{"number":156,"question":"What happened at the Red Sea?","answer":"The children of Israel found themselves trapped between the Red Sea and Pharaoh’s army.","reference":"(Exodus 14:10-12)","points":10},{"number":157,"question":"How can I please God in impossible situations?","answer":"By praising Him and recognizing His miracle working power","reference":"(Exodus 14:13-14; 15:2-18; Psalm 46:10; Isaiah 40:31)","points":10},{"number":158,"question":"QUOTATION QUESTION. How did the children of Israel pass through the Red Sea?","answer":"By faith they passed through the Red sea as by dry land:","reference":"(Hebrews 11:29; Exodus 14:15-16)","points":10},{"number":159,"question":"What happened to Pharaoh’s army at the Red Sea?","answer":"They were drowned and not one of them remained.","reference":"(Exodus 14:28; Hebrews 11:29)","points":10},{"number":160,"question":"How many trials did God send to the children of Israel?","answer":"Ten","reference":"(Exodus 14-17, 24, 32; Numbers 10, 11, 13, 14:22)","points":10},{"number":161,"question":"How can I tempt God?","answer":"By doubting His reality and involvement in my life","reference":"(Exodus 17:1-7; Psalm 78:40-41; 106:13-14)","points":10},{"number":162,"question":"How many times did the children of Israel tempt God?","answer":"Ten","reference":"(Numbers 14:22)","points":10},{"number":163,"question":"How did the children of Israel respond at Marah?","answer":"They murmured against Moses.","reference":"(Exodus 15:24)","points":10},{"number":164,"question":"How can I please God in bitter experiences?","answer":"By taking up my cross (denying myself) and following Him","reference":"(Exodus 15:22-27; Proverbs 27:7; Mark 8:34-35)","points":10},{"number":165,"question":"What does Marah mean?","answer":"Bitterness","reference":"(Exodus 15:23)","points":10},{"number":166,"question":"What happened in the wilderness of Sin?","answer":"The children of Israel had insufficient provision.","reference":"(Exodus 16:1-3)","points":10},{"number":167,"question":"How did the children of Israel respond in the wilderness of Sin?","answer":"They murmured against Moses and Aaron.\nThey wished to have died in Egypt.","reference":"(Exodus 16:1-3)","points":10},{"number":168,"question":"In times of insufficient provision, what opportunity do I have?","answer":"To know the Lord as my Provider","reference":"(Exodus 14-16; Philippians 4:6)","points":10},{"number":169,"question":"What happened to the children of Israel in their trial of obedience?","answer":"God gave instructions on how and when to gather manna.","reference":"(Exodus 16:4, 20; Deuteronomy 9:7, 24)","points":10},{"number":170,"question":"How did the children of Israel respond in their trial of obedience?","answer":"They were disobedient and rebellious to God’s command.","reference":"(Exodus 16:4, 20; Deuteronomy 9:7, 24)","points":10},{"number":171,"question":"QUOTATION QUESTION. Where do the rebellious live?","answer":"The rebellious dwell in a dry land.","reference":"(Psalm 68:6)","points":10},{"number":172,"question":"How does God want to take away my rebellion?","answer":"Through different trials He sends me (in desert experiences)","reference":"(Exodus 16:4, 20; Psalm 68:6; Jeremiah 5:23-25; Hebrews 5:8)","points":10},{"number":173,"question":"QUOTATION QUESTION. How can a child be delivered from foolishness?","answer":"Foolishness is bound in the heart of a child; but the rod of correction shall drive it far from him.","reference":"(Proverbs 22:15)","points":10},{"number":174,"question":"God wants me to obey and submit to whom?","answer":"My pastor\nMy parents","reference":"(Hebrews 13:17) (Ephesians 6:1; Colossians 3:20)","points":10},{"number":175,"question":"What happened at Rephidim?","answer":"The children of Israel found themselves in a dry place without water.","reference":"(Exodus 17:1-7)","points":10},{"number":176,"question":"How did the children of Israel respond at Rephidim?","answer":"They murmured against Moses and they wished they would have died in Egypt.","reference":"(Exodus 17:1-7)","points":10},{"number":177,"question":"How did the children of Israel tempt God at Rephidim?","answer":"They asked: Is the LORD among us, or not?","reference":"(Exodus 17:7)","points":10},{"number":178,"question":"In the middle of the desert, the children of Israel never did what?","answer":"They never lifted their voices to thank and praise the Lord for deliverances in the past or present.","reference":"(Exodus, Numbers, Deuteronomy)","points":10},{"number":179,"question":"QUOTATION QUESTION. According to Proverbs, why is it important to seek the Lord?","answer":"They that seek the Lord understand all things.","reference":"(Proverbs 28:5b)","points":10},{"number":180,"question":"What was the children of Israel’s first battle?","answer":"The battle against Amalek","reference":"(Exodus 17:8-16; Genesis 36:12; John 3:6)","points":10},{"number":181,"question":"What does Amalek represent?","answer":"My carnal man (my flesh, my old nature) that despises God’s way and exchanges it for things of the world","reference":"(Exodus 17:8-16; Genesis 36:12; John 3:6)","points":10},{"number":182,"question":"What is the first battle God wants me to fight?","answer":"The battle against the carnal man (flesh, old nature) in my own life","reference":"(Exodus 17:8-16; Genesis 36:12; John 3:6; Romans 8:13)","points":10},{"number":183,"question":"What happened at Mount Horeb?","answer":"For 40 days, Moses was in the mount with God.\nFor 40 days, the children of Israel didn’t hear from God (there was silence).","reference":"(Exodus 24:1-2, 12-18; 32:1)","points":10},{"number":184,"question":"How did the children of Israel respond at Mount Horeb?","answer":"They turned back to Egypt in their hearts.","reference":"(Exodus 24:1-2, 12-18; 32:1; Acts 7:39-40)","points":10},{"number":185,"question":"","answer":"Desolate","reference":"(Exodus 33:6; Deuteronomy 1:6; 9:8)","points":10},{"number":186,"question":"Mount Horeb is also called what?\nMount Sinai","answer":"","reference":"(Exodus 19:11; 32-33:6)","points":10},{"number":187,"question":"How did God talk with Moses?","answer":"Face to face, as a man speaks to his friend","reference":"(Exodus 33:11)","points":10},{"number":188,"question":"What is the baptism in the Holy Spirit?","answer":"It is a promise and a gift from God the Father.","reference":"(Luke 24:49; Acts 2:38)","points":10},{"number":189,"question":"Where does God want to write His laws?","answer":"In my mind and heart","reference":"(Jeremiah 31:33; II Corinthians 3:3; Hebrews 8:10; 10:16)","points":10},{"number":190,"question":"How did the children of Israel respond to God’s voice?","answer":"They went back, and stood afar off.\nThey begged that His word should not be spoken to them anymore.","reference":"(Exodus 20:18; NKJV Hebrews 12:19)","points":10},{"number":191,"question":"How did Moses respond to God’s voice?","answer":"With fear and trembling he went closer to God - longing for MORE of God’s presence.","reference":"(Exodus 20:21; Hebrews 12:21-29)","points":10},{"number":192,"question":"What were the children of Israel doing when God was giving Moses the pattern for the tabernacle?","answer":"They were making a golden calf and worshipping it.","reference":"(Exodus 19:22-32:35)","points":10},{"number":193,"question":"The tabernacle is also called what?","answer":"The sanctuary","reference":"(Exodus 15:17)","points":10},{"number":194,"question":"Who could enter the outer court?","answer":"All the children of Israel","reference":"(Leviticus 7:28-30; 9:1-24; Numbers 28-29)","points":10},{"number":195,"question":"Who could enter the holy place?","answer":"Only the priests","reference":"(Numbers 3:5-10; Hebrews 9:6)","points":10},{"number":196,"question":"What does Jesus want to make me?","answer":"A king and priest","reference":"(Revelation 1:6; 5:10)","points":10},{"number":197,"question":"Who could enter the Holy of Holies?","answer":"Only the high priest","reference":"(Leviticus 16; Hebrews 9:7)","points":10},{"number":198,"question":"Where did Moses get the material to build the tabernacle?","answer":"From the people who offered willingly","reference":"(Exodus 25:1-8; 35:4-29; 36:3-7)","points":10},{"number":199,"question":"Who is the door?","answer":"Jesus says, I am the door: by me if any man enter in, he shall be saved.","reference":"(John 10:9)","points":10},{"number":200,"question":"QUOTATION QUESTION. Is Jesus the only way to the Father?","answer":"I am the way, the truth, and the life: no man cometh unto the Father, but by me.","reference":"(John 14:6)","points":10},{"number":201,"question":"QUOTATION QUESTION. According to Psalms, how can I cleanse my way?","answer":"How can a young man cleanse his way? By taking heed according to Your word.","reference":"(NKJV Psalm 119:9)","points":10},{"number":202,"question":"What does “offering” mean?","answer":"To draw near","reference":"(Leviticus 1:2)","points":10},{"number":203,"question":"How can I draw near to God?","answer":"With sacrifices and offerings","reference":"(Exodus 23:15; Leviticus 1:2-3; Deuteronomy 16:16; Malachi 1:6-14)","points":10},{"number":204,"question":"QUOTATION QUESTION. Why should I present myself as a living sacrifice, holy and acceptable unto God?","answer":"For of him, and through him, and to him, are all things: to whom be glory for ever.","reference":"(Romans 11:36; 12:1)","points":10},{"number":205,"question":"What keeps the light of the candlestick burning?","answer":"Olive oil","reference":"(Leviticus 24:2)","points":10},{"number":206,"question":"What does oil represent in the Bible?","answer":"The Holy Spirit","reference":"(Psalm 89:20; Matthew 25:1-13)","points":10},{"number":207,"question":"What kind of light does Jesus want me to be?","answer":"The light of the world","reference":"(Matthew 5:14)","points":10},{"number":208,"question":"What does incense represent in the Bible?","answer":"Prayer and intercession","reference":"(Psalm 141:2)","points":10},{"number":209,"question":"Who intercedes for me?","answer":"Jesus\nThe Holy Spirit\nMy leaders","reference":"(Romans 8:34; Hebrews 7:25) (Romans 8:26-27) (Galatians 4:19)","points":10},{"number":210,"question":"QUOTATION QUESTION. How does the Holy Spirit intercede?","answer":"…With groanings which cannot be uttered.","reference":"(Romans 8:26)","points":10},{"number":211,"question":"As a priest, what commandment does God want me to take seriously?","answer":"To give glory to His name","reference":"(Malachi 2:2)","points":10},{"number":212,"question":"As a priest, what happens if I do not take God’s commandment seriously?","answer":"God will send a curse upon me.","reference":"(Malachi 2:2-3)","points":10},{"number":213,"question":"QUOTATION QUESTION. Why did God make a covenant of life and peace with Levi (the priests)?","answer":"…For the fear wherewith he feared me, and was afraid before my name.","reference":"(Malachi 2:5)","points":10},{"number":214,"question":"What tribe was chosen to serve as priests?","answer":"The tribe of Levi","reference":"(Numbers 1:47-53; I Chronicles 15:2)","points":10},{"number":215,"question":"From the tribe of Levi, whom did God choose as high priest?","answer":"Aaron and his sons","reference":"(Exodus 28:1; Numbers 16-17:10)","points":10},{"number":216,"question":"","answer":"Nadab, Abihu, Eleazar, and Ithamar","reference":"(Exodus 28:1)","points":10},{"number":217,"question":"What did Nadab and Abihu offer to God?","answer":"Strange fire","reference":"(Leviticus 10:1-3; Numbers 3:4; 26:61)","points":10},{"number":218,"question":"How did Nadab and Abihu die?","answer":"A fire went out from the Lord and devoured them.","reference":"(Leviticus 10:1-2)","points":10},{"number":219,"question":"How did the children of Israel respond at Taberah?","answer":"They complained.","reference":"(Numbers 11:1)","points":10},{"number":220,"question":"What happened to test the children of Israel’s stomach (appetite)?","answer":"They felt that they would dry up without their favorite foods.","reference":"(Numbers 11:4-6)","points":10},{"number":221,"question":"QUOTATION QUESTION. How did God respond to the children of Israel’s request?","answer":"He gave them their request; but sent leanness into their soul.","reference":"(Psalm 106:15)","points":10},{"number":223,"question":"What does Kibrothhattaavah mean?","answer":"Graves of the covetous","reference":"(Numbers 11:34)","points":10},{"number":224,"question":"What does it mean to be covetous?","answer":"To REALLY want something that belongs to someone else and to want more of something than I have the right to have","reference":"","points":10},{"number":225,"question":"How did God test those who coveted?","answer":"He sent them an abundance of what they wanted.","reference":"(Numbers 11:32)","points":10},{"number":226,"question":"What happened at Kadeshbarnea?","answer":"12 spies went to search the land of Canaan.","reference":"(Numbers 13-14; Deuteronomy 9:23)","points":10},{"number":227,"question":"What two spies returned with a good report?","answer":"Joshua and Caleb","reference":"(Numbers 14:6-9)","points":10},{"number":228,"question":"How did the children of Israel respond to Joshua and Caleb’s report?","answer":"They wanted to stone them with stones.","reference":"(Numbers 14:10)","points":10},{"number":229,"question":"What happened to the ten spies who returned with an evil report?","answer":"They all died by the plague before the Lord.","reference":"(Numbers 14:37)","points":10},{"number":230,"question":"What kind of men were Joshua and Caleb?","answer":"They had a different spirit and wholly followed the Lord.","reference":"(Numbers 14:6, 24, 30; 27:18; 32:12)","points":10},{"number":231,"question":"What did God give Joshua and Caleb?","answer":"The land of Canaan that He had promised","reference":"(Numbers 14:38; 26:65; Joshua 1:1-4; 14:13-14)","points":10},{"number":232,"question":"Whose carcasses fell in the desert?","answer":"Everyone 20 years and older who had murmured against the Lord","reference":"(Numbers 14:29)","points":10},{"number":233,"question":"How many years did the children of Israel wander in the desert because of unbelief?","answer":"40 years","reference":"(Numbers 14:33-35)","points":10},{"number":234,"question":"Why couldn’t the children of Israel enter into God’s promise?","answer":"Because of unbelief","reference":"(Hebrews 3:19)","points":10},{"number":235,"question":"What is a sign of unbelief?","answer":"Disobedience","reference":"(Nehemiah 9:26; NKJV Hebrews 3:8-12, 17-19)","points":10},{"number":236,"question":"Who was Korah?","answer":"A priest from the tribe of Levi","reference":"(Numbers 16:1, 9)","points":10},{"number":237,"question":"What did Korah do?","answer":"He rebelled against Moses and Aaron together with 250 other leaders.","reference":"(Numbers 16:1-50)","points":10},{"number":238,"question":"Against whom did Korah and his company really rebel?","answer":"The Lord","reference":"(Numbers 16:11)","points":10},{"number":239,"question":"What happened to the two hundred and fifty leaders who rebelled against the Lord?","answer":"There came out a fire from the LORD and consumed them.","reference":"(Numbers 16:35)","points":10},{"number":240,"question":"How did the children of Israel respond to God’s judgment?","answer":"They murmured against Moses and against Aaron, saying, Ye have killed the people of the LORD.","reference":"(Numbers 16:41)","points":10},{"number":241,"question":"How did Moses and Aaron respond when God wanted to destroy the children of Israel?","answer":"They fell on their faces before the Lord.","reference":"(Numbers 16:21-22, 41-45)","points":10},{"number":242,"question":"Why did God send fiery serpents to the children of Israel?","answer":"Because they had spoken against God and against Moses","reference":"(Numbers 21:5)","points":10},{"number":243,"question":"What does the serpent’s poison represent?","answer":"The words of Satan","reference":"(Genesis 3:1-5; Numbers 21:4-9; Psalm 58:3-4; 140:3; Revelation 20:2)","points":10},{"number":244,"question":"How can I receive healing from the serpent’s bite?","answer":"By repenting and fixing my eyes on Jesus","reference":"(Numbers 21:4-9; John 3:14-15)","points":10},{"number":245,"question":"What did King Balak say to Balaam?","answer":"I know that he whom you bless is blessed, and he whom you curse is cursed.","reference":"(NKJV Numbers 22:6)","points":10},{"number":246,"question":"Why did King Balak ask Balaam to curse the children of Israel?","answer":"He wanted to be able to defeat them and drive them out of the land.","reference":"(NKJV Numbers 22:6)","points":10},{"number":247,"question":"Why did the Angel of the Lord want to kill Balaam?","answer":"Because Balaam’s way of doing things was perverse to the Lord","reference":"(NKJV Numbers 22:32)","points":10},{"number":248,"question":"Why was Balaam’s donkey afraid to continue on the road?","answer":"She saw the Angel of the Lord standing in the way with His drawn sword in His hand.","reference":"(NKJV Numbers 22:23, 33)","points":10},{"number":249,"question":"How could Balaam’s donkey speak?","answer":"The Lord opened her mouth.","reference":"(NKJV Numbers 22:28)","points":10},{"number":250,"question":"What happened when Balaam tried to curse the children of Israel?","answer":"Because God loved them, He turned the curse into a blessing.","reference":"(Deuteronomy 23:5; Nehemiah 13:2)","points":10},{"number":251,"question":"What was the end of Balaam?","answer":"The end of the wicked","reference":"(Joshua 13:22)","points":10},{"number":252,"question":"Why wasn’t Balaam able to do God’s perfect will?","answer":"His heart coveted money.","reference":"(II Peter 2:15; Jude 1:11)","points":10},{"number":253,"question":"What separates the desert from the land of Canaan?","answer":"The Jordan River","reference":"(Deuteronomy 4:21; Joshua 1:1-2)","points":10},{"number":254,"question":"What happened at the Jordan River?","answer":"God divided the Jordan River like He had divided the Red Sea and the children of Israel passed over on dry land.","reference":"(Joshua 4:22-23)","points":20},{"number":255,"question":"QUOTATION QUESTION. How often does God want me to talk about His words?","answer":"And thou…shalt talk of them when thou sittest in thine house, and when thou walkest by the way, and when thou liest down, and when thou risest up.","reference":"(Deuteronomy 6:7)","points":20},{"number":256,"question":"QUOTATION QUESTION. What will keep me from sinning against God?","answer":"Thy word have I hid in mine heart, that I might not sin against thee.","reference":"(Psalm 119:11)","points":20},{"number":257,"question":"What is the beginning of wisdom and what is understanding?","answer":"The fear of the LORD is the beginning of wisdom: and the knowledge of the holy is understanding.","reference":"(Proverbs 9:10)","points":20},{"number":258,"question":"What do we mean when we say the Bible gives us hope?","answer":"When we read the Bible, hope is birthed in us that God would do in us what He has done in others.","reference":"","points":20},{"number":259,"question":"QUOTATION QUESTION. What does the Bible promise us if we love God’s law?","answer":"Great peace have they which love thy law: and nothing shall offend them.","reference":"(Psalm 119:165)","points":20},{"number":260,"question":"How was the Bible given to man?","answer":"Through the power of the Holy Ghost, holy men of God were inspired to speak and write the message that God wanted to give to all mankind.","reference":"(II Peter 1:21)","points":20},{"number":261,"question":"How do we know that Christ, the Son of God, was the Creator?","answer":"According to the Gospel of John, the Son of God was the Word made flesh and that Word created all things.","reference":"(John 1:1-14)","points":20},{"number":262,"question":"QUOTATION QUESTION. What did God make on the first day of Creation?","answer":"And God said, Let there be light: and there was light. And God saw the light, that it was good: and God divided the light from the darkness. And God called the light Day, and the darkness he called Night.","reference":"(Genesis 1:3-5)","points":20},{"number":263,"question":"Name three areas in which God wants me to make a separation between light and darkness.","answer":"Ungodly friends and relatives\nMy own works of darkness\nMy attitude towards my brother","reference":"(II Corinthians 6:14-15; Psalm 45:10-11; Ephesians 5:3-11; I John 2:9)","points":20},{"number":264,"question":"What two things do I need before I can make a separation between light and darkness?","answer":"Jesus living in my heart\nA love for MORE of Jesus (the light)","reference":"(John 1:4; 3:19, 21; Proverbs 11:3)","points":20},{"number":265,"question":"QUOTATION QUESTION. What is the condemnation?","answer":"And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil.","reference":"(John 3:19)","points":20},{"number":266,"question":"How does the Passover remind me of God’s plan (as revealed in the first day of Creation)?","answer":"My walk with Jesus begins when I accept the Lamb of God as my Savior and recognize the power of His blood to cover and forgive me.","reference":"(Exodus 12:1-14, 42; I Corinthians 5:7)","points":20},{"number":267,"question":"How does the door of the tabernacle remind me of God’s plan (as revealed in the first day of Creation)?","answer":"Jesus says, I am the door: by me if any man enter in, he shall be saved…","reference":"(John 10:9)","points":20},{"number":268,"question":"How does Abel’s life remind me of God’s plan (as revealed in the first day of Creation)?","answer":"Abel offered a lamb to God which reminds me of God’s precious plan of salvation.","reference":"(Genesis 4:4; John 1:29; Hebrews 5:9; 11:4)","points":20},{"number":269,"question":"QUOTATION QUESTION. What did God make on the second day of Creation?","answer":"And God said, Let there be a firmament [a heaven] in the midst of the waters, and let it divide the waters from the waters…and it was so.","reference":"(Genesis 1:6-7)","points":20},{"number":270,"question":"What does water represent in the Bible?","answer":"The Word of God","reference":"(Ephesians 5:26; Deuteronomy 32:1-2; Psalm 119:9; John 15:3)","points":20},{"number":271,"question":"How does the Feast of Unleavened Bread remind me of God’s plan (as revealed in the second day of Creation)?","answer":"God wants false thoughts and ideas (leavened bread) to be taken out of my heart and replaced with true thoughts and ideas (unleavened bread).","reference":"(Exodus 12:17, 18, 39)","points":20},{"number":272,"question":"QUOTATION QUESTION. Who is the bread of life?","answer":"Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger; and he that believeth on me shall never thirst.","reference":"(John 6:35)","points":20},{"number":273,"question":"Whose words should I be reading (eating) every day and why?","answer":"I should be reading (eating) the words that Jesus speaks to me, because they are spirit, and they are life.","reference":"(John 6:63)","points":20},{"number":274,"question":"Why should I be careful about what I see and hear?","answer":"Because what I see and hear is the spiritual food I eat, and I become what I eat.","reference":"(John 6:51, 63; Daniel 1:8-20)","points":20},{"number":275,"question":"How does the laver in the tabernacle remind me of God’s plan (as revealed in the second day of Creation)?","answer":"God wants His Word to be washing away the unclean areas of my heart every day.","reference":"(John 15:3; Ephesians 5:26-27)","points":20},{"number":276,"question":"How does Enoch’s life remind me of God’s plan (as revealed in the second day of Creation)?","answer":"Enoch became God’s messenger because he allowed God to take all of the worldly thoughts and ideas out of his life and replace them with God’s thoughts and ideas.","reference":"(Jeremiah 15:19; Jude 1:14-16)","points":20},{"number":277,"question":"QUOTATION QUESTION. What did God make on the third day of Creation?","answer":"And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so. And God called the dry land Earth; and the gathering together of the waters called he Seas. And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind…and it was so.","reference":"(Genesis 1:9-12)","points":20},{"number":278,"question":"QUOTATION QUESTION. Why does God want me to love my brother?","answer":"We know that we have passed from death unto life, because we love the brethren. He that loveth not his brother abideth in death.","reference":"(I John 3:14)","points":20},{"number":279,"question":"QUOTATION QUESTION. What did God make on the fourth day of Creation?","answer":"And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.","reference":"(Genesis 1:16)","points":20},{"number":280,"question":"QUOTATION QUESTION. What did God make on the fifth day of Creation?","answer":"And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven.","reference":"(Genesis 1:20)","points":20},{"number":281,"question":"QUOTATION QUESTION. What important instruction does the book of Hebrews give me for inheriting God’s promise?","answer":"Cast not away therefore your confidence, which hath great recompense of reward. For ye have need of patience, that, after ye have done the will of God, ye might receive the promise.","reference":"(Hebrews 10:35-36)","points":20},{"number":282,"question":"QUOTATION QUESTION. What did God make on the sixth day of Creation?","answer":"And God said, Let us make man in our image, after our likeness…\nAnd the Lord God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.","reference":"(Genesis 1:26; 2:7)","points":20},{"number":283,"question":"How was man created in the image of God?","answer":"Man has a body that has the same image as the Lord’s body: with a head, hands and feet.","reference":"(Genesis 1:26; Song of Solomon 5:11-16; 1 Peter 2:24)","points":20},{"number":284,"question":"How was man created in the likeness of God?","answer":"Man was created with an emotional and spiritual life that is like unto God’s.","reference":"(Genesis 1:26)","points":20},{"number":285,"question":"QUOTATION QUESTION. Why should I love God more than my family?","answer":"He that loveth father or mother more than me is not worthy of me: and he that loveth son or daughter more than me is not worthy of me.","reference":"(Matthew 10:37)","points":20},{"number":287,"question":"What message did God give when He provided coats of skins for a covering?","answer":"The Lamb of God’s coat of skin is the only effective covering for my sin.","reference":"(Genesis 3:21; John 1:29)","points":20},{"number":288,"question":"What judgments did Adam and Eve receive?","answer":"Their sorrow would be greatly multiplied.\nThe ground would be cursed.\nAdam would become Eve’s ruler.\nThey would have to leave the Garden of Eden.","reference":"(Genesis 3:16-19)","points":20},{"number":289,"question":"Who is allowed to return to the Garden of Eden?","answer":"Everyone who is willing to submit his life to the sword of the Word of God, because he that loseth his life for Jesus’ sake shall find it","reference":"(Genesis 3:24; Matthew 10:39; Hebrews 4:12)","points":20},{"number":290,"question":"What two lineages (people) do we find from the beginning of time?","answer":"The lineage of the wicked (Cain)\nThe lineage of the righteous (Abel)","reference":"(Genesis 4:16-22; 25-26; 5:1-32)","points":20},{"number":291,"question":"QUOTATION QUESTION. According to Hebrews, who lives by faith?","answer":"Now the just shall live by faith: but if any man draw back, my soul shall have no pleasure in him.","reference":"(Hebrews 10:38)","points":20},{"number":292,"question":"How is the ark a figure of the church?","answer":"The ark contained the animals that were saved from the flood.\nThe church contains the Lord’s sheep that will be saved from a flood.","reference":"(Genesis 7 and 8; John 10:14; Revelation 12:15)","points":20},{"number":293,"question":"How does the ark apply to my life?","answer":"God’s church (the ark) is the only place where I will be protected.\nI must remain a part of God’s church in order to be saved.","reference":"(Exodus 11:7; Matthew 24:37-39; Hebrews 10:25)","points":20},{"number":294,"question":"What does pitch, which was used to cover the ark, mean?","answer":"Pitch means “atonement” and speaks of Christ’s forgiveness, sanctification, and perfection in my life.","reference":"(Genesis 6:14)","points":20},{"number":295,"question":"How does the ark, covered with pitch within and without, apply to my life?","answer":"If I am part of God’s church (the ark) and Christ’s atonement (pitch) is covering my life within and without, I will be kept from sinking in the stormy trials (difficulties) of life.","reference":"(Genesis 6:14; Romans 5:8-11)","points":20},{"number":296,"question":"How did the animals come to the ark and what do I learn from that?","answer":"God brought the animals to the ark supernaturally.\nGod brings (draws) me to Himself supernaturally.","reference":"(Genesis 7:1-9)","points":20},{"number":297,"question":"God’s judgments on the earth will bring what results?","answer":"Fear of God\nHumility\nRest\nMore of God (fresh anointing)","reference":"(Genesis 7:19; 8:4, 11; Isaiah 2:12-21)","points":20},{"number":298,"question":"Why did God place the rainbow in the sky?","answer":"As a sign of His promise that He would never again destroy the earth with a flood of water","reference":"(Genesis 9:8-17)","points":20},{"number":299,"question":"What does Ur of the Chaldees represent?","answer":"The world and my life in the world before coming to know Jesus as my Savior","reference":"(Genesis 11:31; Ephesians 2:1-3)","points":20},{"number":300,"question":"What does the land of Canaan represent?","answer":"It represents my goal as a Christian: the place where Jesus COMPLETELY fills my heart (my earth) - bringing me into true rest.","reference":"(Exodus 6:3-4; Galatians 2:20; 3:29; Colossians 1:27; Hebrews 3:7-4:12)","points":20},{"number":301,"question":"QUOTATION QUESTION. How does the book of Proverbs describe both the lazy and the diligent man?","answer":"The soul of a lazy man desires, and has nothing; But the soul of the diligent shall be made rich.","reference":"(NKJV Proverbs 13:4)","points":20},{"number":302,"question":"Why is it important that I be diligent?","answer":"Being diligent is not a guarantee that I will hit God’s mark for my life, but not being diligent will disqualify me","reference":"(Proverbs 6:9-11; 13:4; Hebrews 10:35-37)","points":20},{"number":303,"question":"What lesson do I learn from Abram’s name?","answer":"When I begin my journey with the Lord, I must learn to be humble.","reference":"(Genesis 11:26; Deuteronomy 8:2)","points":20},{"number":304,"question":"What lesson do I learn from Sarai’s name?","answer":"When I begin my journey with the Lord, I must learn to obey those in authority over me.","reference":"(Genesis 12:10-20; 20:1-18; I Peter 3:6)","points":20},{"number":305,"question":"What two important things do I receive when I meet with God?","answer":"The power to be obedient\nThe power to conquer my enemies","reference":"(Genesis 12; 13:4-8; Luke 19:41-44; John 1:17)","points":20},{"number":306,"question":"What is meekness?","answer":"Meekness is surrendering my rights as Jesus surrendered His at Calvary.","reference":"(Isaiah 53:7)","points":20},{"number":307,"question":"QUOTATION QUESTION. How important is it that I be meek?","answer":"Seek ye the Lord, all ye meek of the earth…it may be ye shall be hid in the day of the Lord’s anger.","reference":"(Zephaniah 2:3)","points":20},{"number":308,"question":"QUOTATION QUESTION. What kind of city was Abraham looking for?","answer":"For he looked for a city which hath foundations, whose builder and maker is God.","reference":"(Hebrews 11:10)","points":20},{"number":309,"question":"Who gave Abram a guarantee that he would inherit God’s promise?","answer":"God the Father and God the Son who cannot lie or fail","reference":"(Genesis 15:17-18; Hebrews 6:13-18)","points":20},{"number":310,"question":"QUOTATION QUESTION. What should be the hope of every Christian?","answer":"Christ in you, the hope of glory…","reference":"(Colossians 1:27)","points":20},{"number":311,"question":"What happened when Abram and Sarai tried to obtain God’s promise their way instead of God’s?","answer":"Ishmael, a wild man, was born.","reference":"(Genesis 16:2-15)","points":20},{"number":312,"question":"Why is it important to understand God’s visit to Abraham and Lot?","answer":"Abraham and Lot represent two different types of Christians.\nAs God visited them, He will also visit me and His visitation will bring either blessing or judgment.","reference":"(Genesis 18 and 19; Luke 17:22-37; Romans 4:16; Galatians 3:29)","points":20},{"number":313,"question":"Whom did Lot choose for companions and why?","answer":"Lot chose those who were exceedingly wicked and sinful because he did not value the friendship of those who feared God.","reference":"(Genesis 13:11-14)","points":20},{"number":314,"question":"QUOTATION QUESTION. According to Proverbs, what will happen if I choose to be friends with the foolish?","answer":"He that walketh with wise men shall be wise: but a companion of fools shall be destroyed.","reference":"(Proverbs 13:20)","points":20},{"number":315,"question":"What is represented by Abraham offering up Isaac?","answer":"The heavenly Father offering up His only begotten Son","reference":"(Genesis 22:2; John 3:16; Romans 4:16-25; Hebrews 11:17; I John 4:9)","points":20},{"number":316,"question":"QUOTATION QUESTION. When did Abraham receive the promise?","answer":"And so, after he had patiently endured, he obtained the promise.","reference":"(Hebrews 6:15)","points":20},{"number":317,"question":"What were the two aspects of Abraham’s faith?","answer":"He believed that he would have a son even though it was impossible.\nHe believed that God would raise Isaac from the dead.","reference":"(Romans 4:19-21; Hebrews 11:17-19)","points":20},{"number":318,"question":"QUOTATION QUESTION. According to the Scripture, what is the earnest expectation of the creature?","answer":"For the earnest expectation of the creature waiteth for the manifestation of the sons of God.","reference":"(Romans 8:19)","points":20},{"number":319,"question":"What should I do when I have trials (difficulties)?","answer":"Draw water out of the well of God’s presence by praising, singing and thanking Him.","reference":"(Isaiah 12:2-6)","points":20},{"number":320,"question":"When I praise and thank the Lord for my trials (difficulties), what will they do for me?","answer":"They will carry me to the place where I will meet with Jesus.","reference":"(Genesis 24:20-24, 61-64; Isaiah 12:2-6)","points":20},{"number":321,"question":"How were Jacob and Esau different?","answer":"Esau didn’t care about God or the things of God.","reference":"(Genesis 25:23, 31-34; Hebrews 12:16)","points":20},{"number":322,"question":"What determines if I am a sheep or a swine to God?","answer":"The longings (desires) of my heart","reference":"(Genesis 25:12-23, 30-34; Matthew 7:6; Hebrews 12:16-17; II Peter 2:22)","points":20},{"number":323,"question":"QUOTATION QUESTION. Can I sin without receiving consequences?","answer":"Be not deceived; God is not mocked: for whatsoever a man soweth, that shall he also reap.","reference":"(Galatians 6:7)","points":20},{"number":324,"question":"What attitude helped Jacob climb closer to God?","answer":"A contrite (crushed, broken) and humble attitude","reference":"(Genesis 32:9-11)","points":20},{"number":325,"question":"What did it mean when God changed Jacob’s name?","answer":"That Jacob was a changed man","reference":"(Genesis 32:27-28)","points":20},{"number":326,"question":"Why does God call Himself the God of Abraham, of Isaac, and of Jacob?","answer":"God wants me to have the hope that He can change my life just like He changed theirs.","reference":"(Exodus 3:15-16)","points":20},{"number":327,"question":"Why did Joseph’s brothers hate him?","answer":"The coat of many colors was proof to them that their father had chosen Joseph to be both the heir and the firstborn.","reference":"(Genesis 37:3-4)","points":20},{"number":328,"question":"In the Bible, what three things did the firstborn inherit?","answer":"The natural leadership of the family\nThe spiritual leadership of the family\nA double portion of the inheritance","reference":"(I Chronicles 5:1-2) (Numbers 3:12) (Deuteronomy 21:17)","points":20},{"number":329,"question":"QUOTATION QUESTION. Is it right to hate my brother?","answer":"Whosoever hateth his brother is a murderer: and ye know that no murderer hath eternal life abiding in him.","reference":"(I John 3:14-15)","points":20},{"number":330,"question":"What should I do when I am tempted to do what is wrong?","answer":"Flee from temptation","reference":"(II Timothy 2:22)","points":20},{"number":331,"question":"QUOTATION QUESTON. What is the reward of the diligent?","answer":"Seest thou a man diligent in his business? he shall stand before kings; he shall not stand before mean men.","reference":"(Proverbs 22:29)","points":20},{"number":332,"question":"QUOTATION QUESTION. Why did God work all things for good in Joseph’s life?","answer":"And we know that all things work together for good to them that love God, to them who are the called according to his purpose.","reference":"(Romans 8:28)","points":20},{"number":333,"question":"Why did Joseph name his oldest son Manasseh (“Causing to forget”)?","answer":"Because God had made him forget all his hard work, and all his father’s house","reference":"(Genesis 41:51)","points":20},{"number":334,"question":"Why did Joseph name his youngest son Ephraim (“Double fruit”)?","answer":"Because God had caused him to be fruitful in the land of his affliction","reference":"(Genesis 41:52)","points":20},{"number":335,"question":"Why did Joseph test his brothers?","answer":"He wanted to know if God had changed them or if they were still the same hateful and envious men.","reference":"(Genesis 42:9-45:15)","points":20},{"number":336,"question":"Why did Joseph weep when he heard Judah’s request?","answer":"He saw that the grace and power of God had changed a heart full of hate and envy to a heart full of love and unselfishness.","reference":"(Genesis 44-45)","points":20},{"number":337,"question":"QUOTATION QUESTION. How can I fulfill all of God’s commandments?","answer":"For all the law is fulfilled in one word, even in this: You shall love your neighbor as yourself.","reference":"(NKJV Galatians 5:14)","points":20},{"number":338,"question":"What had the grace and power of God done in Joseph’s life?","answer":"It had helped him to forgive his brothers and to forget all his hard labor.","reference":"(Genesis 41:51-52; 45:1-15; 50:17-21)","points":20},{"number":339,"question":"QUOTATION QUESTION. Who did Joseph say had sent him to Egypt and why?","answer":"God sent me before you to preserve a posterity for you in the earth, and to save your lives by a great deliverance. So now it was not you that sent me here, but God…","reference":"(NKJV Genesis 45:7-8)","points":20},{"number":340,"question":"QUOTATION QUESTION. Why did Moses kill the Egyptian?","answer":"He supposed his brethren would have understood how that God by his hand would deliver them: but they understood not.","reference":"(Acts 7:25)","points":20},{"number":341,"question":"QUOTATION QUESTION. What lesson do I learn from Moses killing the Egyptian?","answer":"As the heavens are higher than the earth, so are God’s ways higher than my ways, and His thoughts than my thoughts.","reference":"(Isaiah 55:9)","points":20},{"number":342,"question":"QUOTATION QUESTION. What did Moses choose?","answer":"Choosing rather to suffer affliction with the people of God, than to enjoy the pleasures of sin for a season…","reference":"(Hebrews 11:25)","points":20},{"number":343,"question":"QUOTATION QUESTION. What did Moses consider greater than the treasures in Egypt and why?","answer":"Esteeming the reproach of Christ greater riches than the treasures in Egypt: for he had respect unto the recompense of the reward.","reference":"(Hebrews 11:26)","points":20},{"number":344,"question":"QUOTATION QUESTION. How did Moses forsake Egypt?","answer":"By faith he forsook Egypt, not fearing the wrath of the king: for he endured, as seeing him who is invisible.","reference":"(Hebrews 11:27)","points":20},{"number":345,"question":"Why did Moses name his oldest son Gershom (refugee)?","answer":"For he said, I have been a stranger in a strange land.","reference":"(Exodus 2:22)","points":20},{"number":346,"question":"Why did Moses name his youngest son Eliezer (God of help)?","answer":"The God of my father, said he, was mine help, and delivered me from the sword of Pharaoh.","reference":"(Exodus 18:4)","points":20},{"number":347,"question":"QUOTATION QUESTION. How does God feel towards those who consider themselves strangers and pilgrims on the earth?","answer":"God is not ashamed to be called their God: for he hath prepared for them a city.","reference":"(Hebrews 11:13-16)","points":20},{"number":348,"question":"How does the book of Acts describe Moses?","answer":"Moses was learned in all the wisdom of the Egyptians, and was mighty in words and in deeds.","reference":"(Acts 7:22)","points":20},{"number":349,"question":"What does it mean if I am humble?","answer":"I have allowed God to crush me and bring me down to a low place.","reference":"(Isaiah 57:15)","points":20},{"number":350,"question":"How was Moses’ life changed by his desert experience?","answer":"He no longer felt capable of delivering the children of Israel.\nHe considered himself to be slow of speech and slow of tongue.","reference":"(Exodus 3:11; 4:10, 13)","points":20},{"number":351,"question":"How does God make me feel uncomfortable in the world?","answer":"With slavery and hard bondage to Satan (sin)","reference":"(Exodus 1:11, 14; I Corinthians 10:1-11)","points":20},{"number":352,"question":"What moves God to send a Savior?","answer":"When His children recognize their need for His help and cry out to Him","reference":"(Exodus 3:7-9)","points":20},{"number":353,"question":"What hardens my heart?","answer":"The deceitfulness of sin","reference":"(Hebrews 3:13)","points":20},{"number":354,"question":"What softens my heart?","answer":"Meetings with Jesus","reference":"(Job 23:16; Psalm 65:10)","points":20},{"number":355,"question":"Why did God send the plagues on Egypt?","answer":"To judge those who harden their hearts against His Word\nTo set His people free from slavery","reference":"(Exodus 3:19-20; 7:14-12:36)","points":20},{"number":356,"question":"What would have happened to the children of Israel if Moses had agreed to compromise with Pharaoh?","answer":"The children of Israel would have served God half-heartedly and Pharaoh would have continued to control their lives.","reference":"(Exodus 8-10)","points":20},{"number":357,"question":"What does God say about those who serve Him half-heartedly?","answer":"He will vomit them out of His mouth.","reference":"(NKJV Revelation 3:15-16)","points":20},{"number":358,"question":"How does Jesus teach me to celebrate my salvation experience (the Feast of Passover)?","answer":"By partaking of communion (the Lord’s Supper) and remembering what the Lamb of God has done for me","reference":"(Luke 22:7-20; I Corinthians 11:23-26)","points":20},{"number":359,"question":"What two things must I experience before I partake of communion (the Lord’s Supper)?","answer":"I must have a salvation experience and be baptized in water.","reference":"(Exodus 12:43-48; Colossians 2:11-12)","points":20},{"number":360,"question":"How should I partake of communion (the Lord’s Supper)?","answer":"Examining my heart with a repentant attitude\nDiscerning the Lord’s body","reference":"(I Corinthians 11:28-31)","points":20},{"number":361,"question":"QUOTATION QUESTION. What happens if I partake of communion (the Lord’s Supper) in an unworthy manner?","answer":"For this cause many are weak and sickly among you, and many\nsleep [are dead].","reference":"(I Corinthians 11:30)","points":20},{"number":362,"question":"What three things must I experience before I take the step of water baptism?","answer":"I must believe on Jesus.\nI must experience true repentance.\nI must desire to live differently.","reference":"(Acts 8:36-37; 2:38; Romans 6:4)","points":20},{"number":363,"question":"What is essential for survival in my desert experiences?","answer":"Meetings with the One who is the Word of God","reference":"(Isaiah 43:19-20; John 1:1-4; 7:38; 15:3; Hebrews 1:3)","points":20},{"number":364,"question":"What does the apostle Paul say about the children of Israel’s journey?","answer":"The details of their journey are a warning for me.","reference":"(I Corinthians 10:1-11)","points":20},{"number":365,"question":"What is the main purpose of my journey with the Lord?","answer":"To bring me into God’s inheritance where He inherits me and I inherit Him","reference":"(Exodus 6:6-8; Ezekiel 36:27-28; Colossians 1:27; Ephesians 2:1-6)","points":20},{"number":366,"question":"When God makes a promise with me, why does He wait to give it to me?","answer":"Through trials (difficulties), He humbles me so that I can receive His promise.","reference":"(Deuteronomy 8:16)","points":20},{"number":367,"question":"QUOTATION QUESTION. What instruction does the book of Hebrews give me for my journey?","answer":"Be not slothful, but followers of them who through faith and patience inherit the promises.","reference":"(Hebrews 6:12)","points":20},{"number":368,"question":"What does the desert represent in my life?","answer":"Uncomfortable and impossible situations\nDoubts and fears","reference":"(Deuteronomy 8:15; Jeremiah 2:6; I Corinthians 10:1-11)","points":20},{"number":369,"question":"What does the journey of the children of Israel show me?","answer":"Where I once was\nWhere I find myself\nWhere I’m going","reference":"(Exodus, Numbers, I Corinthians 10:1-11)","points":20},{"number":370,"question":"In my journey with the Lord, what does He want me to remember?","answer":"He will never leave me or forsake me.\nHe will not allow me to be tempted beyond what I am able to bear.","reference":"(Deuteronomy 31:6, 8; I Corinthians 10:13; Hebrews 13:5-6)","points":20},{"number":371,"question":"How did God go before the children of Israel and what do I learn?","answer":"By day in a pillar of cloud and by night in a pillar of fire\nGod is with me – ALWAYS caring for me.","reference":"(Exodus 13:21-22; Matthew 28:20)","points":20},{"number":372,"question":"QUOTATION QUESTION. How did the children of Israel respond to their captivity at the Red Sea?","answer":"For it had been better for us to serve the Egyptians, than that we should die in the wilderness.","reference":"(Exodus 14:12)","points":20},{"number":373,"question":"What did the children of Israel so soon forget?","answer":"How Pharaoh had kept them in slavery and hard bondage and had killed their children\nHow God had been their mighty Savior","reference":"(Exodus 1:14-16; Deuteronomy 26:6-8; Psalm 78:42-51; 106:13, 21)","points":20},{"number":374,"question":"What two things will happen if my eyes are on the world (Egypt)?","answer":"I will believe that it is better to die under slavery and hard bondage to Satan.\nWhen trials come I will want to return to the world.","reference":"(Exodus 14:10-12)","points":20},{"number":375,"question":"What will happen if my eyes are on Jesus?","answer":"I will believe that it is better to die in the desert seeking God’s promise than to die under slavery and hard bondage to Satan.","reference":"(Job 13:15; Hebrews 12:2-4)","points":20},{"number":376,"question":"In impossible situations, what opportunity do I have?","answer":"To know the Lord as a man of war, my strength, and my salvation","reference":"(Exodus 15:2-18)","points":20},{"number":377,"question":"What two things will determine if I finish my journey with the Lord?","answer":"My actions and attitudes","reference":"(Exodus; I Peter 5:5; James 2:20, 26)","points":20},{"number":378,"question":"What happened at Marah?","answer":"The children of Israel had gone three days without water.\nWhen they found water it was bitter.\nGod showed Moses a tree and when Moses threw the tree into the bitter water, it became sweet.","reference":"(Exodus 15:22-26)","points":20},{"number":379,"question":"In bitter experiences, what opportunity do I have?","answer":"To know the Lord as my Healer\nTo know the Lord as the One who makes every bitter thing sweet.","reference":"(Exodus 15:25-26)","points":20},{"number":380,"question":"QUOTATION QUESTION. Does God care what my attitude towards my parents is?","answer":"The eye that mocketh at his father, and despiseth to obey his mother, the ravens of the valley shall pick it out, and the young eagles shall eat it.","reference":"(Proverbs 30:17)","points":20},{"number":381,"question":"What does the Bible teach me about discipline?","answer":"He who withholds his rod hates his son, but he who loves him disciplines him diligently.","reference":"(Proverbs 13:24)","points":20},{"number":382,"question":"How can I please God in trials of obedience?","answer":"By not resisting but staying in the trial until the rebellion in me has been broken","reference":"(Exodus 16:4, 20; Hebrews 5:8)","points":20},{"number":383,"question":"QUOTATION QUESTION. Why does God command me to obey my leaders?","answer":"For they watch for your souls, as they that must give account, that they may do it with joy, and not with grief: for that is unprofitable for you.","reference":"(Hebrews 13:17b)","points":20},{"number":384,"question":"Why did God feed the children of Israel with manna?","answer":"That He might make them know that man does not live by bread alone; but by every word that proceeds from the mouth of the LORD","reference":"(Deuteronomy 8:3)","points":20},{"number":385,"question":"In trials of obedience, what opportunity do I have?","answer":"To know the Lord as the Bread of Life","reference":"(Deuteronomy 8:3; John 6:31-35, 48-51, 58)","points":20},{"number":386,"question":"How can I please God in times of spiritual dryness and thirst?","answer":"By seeking Him more, praising Him, and searching for a deeper relationship with Him","reference":"(Psalm 63:1-8; Isaiah 44:1-3)","points":20},{"number":387,"question":"QUOTATION QUESTION. When we feel faint and weary, what does the Bible tell us to do?","answer":"But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.","reference":"(Isaiah 40:31)","points":20},{"number":388,"question":"QUOTATION QUESTION. What is required to please God?","answer":"But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him.","reference":"(Hebrews 11:6)","points":20},{"number":389,"question":"In times of spiritual dryness and thirst, what opportunity do I have?","answer":"To know the Lord as the Rock of Salvation","reference":"(Exodus 17:5-6; Numbers 20:8; I Corinthians 10:4)","points":20},{"number":390,"question":"In Ephesians chapter six, what is the only weapon of attack found in God’s armor?","answer":"The sword of the spirit, which is the Word of God","reference":"(Ephesians 6:17)","points":20},{"number":391,"question":"How can I please God in times of desolation (and lack of progress)?","answer":"Have a heart of true repentance (for past failures)\nHave a cry that recognizes who I am\nHave a desire to run after the Lord in spite of who I am","reference":"(Exodus 34:5-10)","points":20},{"number":392,"question":"QUOTATION QUESTION. In times of desolation (and lack of progress), what opportunity do I have?","answer":"To know the LORD God who is: merciful and gracious, longsuffering, and abundant in goodness and truth, Keeping mercy for thousands, forgiving iniquity and transgression and sin, and that will by no means clear the guilty…","reference":"(Exodus 34:6-7)","points":20},{"number":393,"question":"What three things do I need for a successful journey with the Lord?","answer":"A spiritual leader to obey and follow\nA personal relationship with Jesus\nThe baptism in the Holy Spirit","reference":"(Exodus 12; John 3:3) (Acts 7:35-39; Hebrews 13:17) (Exodus 19; Acts 2:1-4, 33, 38)","points":20},{"number":394,"question":"Why is the baptism in the Holy Spirit so important?","answer":"It gives me the power to be filled with all the fullness of God.","reference":"(Luke 24:49; Acts 1:8; Ephesians 3:16-20)","points":20},{"number":395,"question":"What is the initial evidence of the baptism in the Holy Spirit?","answer":"Speaking with other tongues (languages)","reference":"(Acts 2:4; 10:46)","points":20},{"number":396,"question":"QUOTATION QUESTION. Which is the first and great commandment?","answer":"Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind.","reference":"(Matthew 22:37)","points":20},{"number":397,"question":"QUOTATION QUESTION. Which commandment is like the first?","answer":"Thou shalt love thy neighbor as thyself.","reference":"(Matthew 22:39)","points":20},{"number":398,"question":"QUOTATION QUESTION. Which is the first commandment with promise?","answer":"Honor thy father and thy mother; That it may be well with thee, and thou mayest live long on the earth.","reference":"(Ephesians 6:2-3)","points":20},{"number":399,"question":"QUOTATION QUESTION. Which of the commandments warns me to be careful with God’s name?","answer":"Thou shalt not take the name of the Lord thy God in vain; for the LORD will not hold him guiltless that taketh his name in vain.","reference":"(Exodus 20:7)","points":20},{"number":400,"question":"QUOTATION QUESTION. Which of the commandments warns me to tell the truth?","answer":"Thou shalt not bear false witness against thy neighbor.","reference":"(Exodus 20:16)","points":20},{"number":401,"question":"QUOTATION QUESTION. According to Revelation, why is it so serious to lie?","answer":"But the fearful, and unbelieving, and the abominable, and murderers, and whoremongers, and sorcerers, and idolaters, and all liars, shall have their part in the lake which burneth with fire and brimstone: which is the second death.","reference":"(Revelation 21:8)","points":20},{"number":402,"question":"Why did the children of Israel refuse God’s voice?","answer":"They couldn’t endure what was commanded – death.\nThey weren’t interested in God’s presence.","reference":"(Exodus 20:19; Hebrews 12:20-29)","points":20},{"number":403,"question":"Why did God want the children of Israel to build a tabernacle?","answer":"He wanted to live among them and be their God.\nHe wanted His nature and His ways to be seen.","reference":"(Exodus 25:8; 29:42-46; Revelation 21:3; Psalm 68:24; 77:13)","points":20},{"number":404,"question":"Describe the sanctuary or tabernacle.","answer":"A holy place\nA place of glory and power\nA place of sacrifice","reference":"(Exodus 39:41; 40:34; Deuteronomy 12:5-6; Psalm 63:2; 96:6)","points":20},{"number":405,"question":"What were the three main parts of the tabernacle?","answer":"Outer Court\nHoly Place\nHoly of Holies","reference":"(Exodus 27:9-18; 26:1-37; Ezekiel 10:5; Hebrews 9:2-7, 25)","points":20},{"number":406,"question":"What is now open to all true Christians through Jesus?","answer":"The way into the Holy of Holies","reference":"(Hebrews 9:7-14; 10:19-20)","points":20},{"number":407,"question":"How can I enter through the door?","answer":"I must believe that God has raised Jesus from the dead.\nI must recognize my need for a Savior.\nI must open my heart to Jesus: calling out to Him to save me from my sins and make me clean.","reference":"(Acts 16:31; 20:21; Romans 10:9-10; I John 1:9)","points":20},{"number":408,"question":"What is proof that I have gone through the door (had a salvation experience)?","answer":"I have had a meeting with Jesus that has changed my life.\nI know that the Bible is inspired by God.\nI know that my sins have been forgiven.","reference":"(Exodus 27:16; John 3:16, 36; 10:7:9; II Corinthians 5:17; Hebrews 9:22)","points":20},{"number":409,"question":"QUOTATION QUESTION. How important is Jesus’ name?","answer":"Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved.","reference":"(Acts 4:12)","points":20},{"number":410,"question":"QUOTATION QUESTION. Who will God save?","answer":"For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.","reference":"(John 3:16)","points":20},{"number":411,"question":"QUOTATION QUESTION. What does First John say about sin?","answer":"If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.","reference":"(I John 1:9)","points":20},{"number":412,"question":"What lesson do I learn at the laver?","answer":"God takes very seriously how I come before Him.\nI must be clean before I come before Him to worship.","reference":"(Exodus 30:19-21; Psalm 26:6)","points":20},{"number":413,"question":"How can I dishonor God’s name?","answer":"By not offering my best to God\nBy believing that it’s so much trouble and so tiring to bring an offering to God","reference":"(Leviticus 3:6; 4:32; 9:3; 14:10; 22:21-22, 24-25; 23:12; Malachi 1:6-14)","points":20},{"number":414,"question":"Describe the fire on the brazen altar.","answer":"It was sent from God.\nIt was to be kept burning continually.","reference":"(Leviticus 9:24; 6:13)","points":20},{"number":415,"question":"What lesson do I learn at the brazen altar?","answer":"Through sacrifices and offerings, God has provided a way for me to keep the fire of His presence burning in my heart continually.","reference":"(Leviticus 6:13; Luke 14:26-27; Romans 8:13)","points":20},{"number":416,"question":"QUOTATION QUESTION. Why does God want my light to shine?","answer":"Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.","reference":"(Matthew 5:16)","points":20},{"number":417,"question":"What does it mean to intercede?","answer":"To put myself in the place and situation of someone else and make a request for them","reference":"(Romans 8:26-27, 34; Galatians 4:19; I Timothy 2:1; Hebrews 7:25)","points":20},{"number":418,"question":"QUOTATION QUESTION. Who should I fear and who should I dread?","answer":"Sanctify the LORD of hosts himself; and let him be your fear, and let him be your dread.","reference":"(Isaiah 8:13)","points":20},{"number":419,"question":"What lesson does God want me to learn from Nadab and Abihu?","answer":"I cannot draw near to God my way and live.\nI must draw near His way.","reference":"(Leviticus 10:1-4; Numbers 3:4)","points":20},{"number":420,"question":"QUOTATION QUESTION. What does God promise to do with the sons of Levi?","answer":"He shall sit as a refiner and purifier of silver: and he shall purify the sons of Levi, and purge them as gold and silver, that they may offer unto the LORD an offering in righteousness.","reference":"(Malachi 3:3)","points":20},{"number":421,"question":"How did the cloud lead the way for the children of Israel?","answer":"When the cloud moved off the tabernacle, the children of Israel journeyed.\nWhen the cloud rested on the tabernacle, the children of Israel rested.","reference":"(Numbers 9:17-22)","points":20},{"number":422,"question":"What happened while the children of Israel journeyed towards Taberah?","answer":"The ark of the covenant of the Lord went before them to search out a resting place and the cloud of the Lord was upon them by day.","reference":"(Numbers 10:33-36)","points":20},{"number":423,"question":"How did God respond to the children of Israel’s complaining at Taberah?","answer":"He heard and was angry.\nHis fire burnt among them and consumed some in the outskirts of the camp.","reference":"(Numbers 11:1-3)","points":20},{"number":424,"question":"How did the children of Israel make their requests known to God?","answer":"Without waiting for His counsel (they thought they knew better than God)\nWith complaints against their leader and against God","reference":"(Numbers 11:4-6, 10; Psalm 78:18-20; 106:13)","points":20},{"number":425,"question":"QUOTATION QUESTION. How can I please God when I am tempted to be unthankful?","answer":"Speaking to yourselves in psalms and hymns and spiritual songs, singing and making melody in your heart to the Lord; Giving thanks always for all things unto God and the Father in the name of our Lord Jesus Christ...","reference":"(Ephesians 5:19-20)","points":20},{"number":426,"question":"QUOTATION QUESTION. Who are enemies of the cross of Christ?","answer":"Those…whose end is destruction, whose god is their belly, and whose glory is in their shame - who set their mind on earthly things","reference":"(NKJV Philippians 3:18-19)","points":20},{"number":427,"question":"How can I please God with my stomach?","answer":"I can fast to overcome the enemy of the cross who lives inside of me.","reference":"(Philippians 3:17; II Corinthians 11:27)","points":20},{"number":428,"question":"What does God want me to do when I have a need?","answer":"He wants me to wait for His counsel so that my request can be made according to His will.","reference":"(Psalm 106:13; I John 5:14-15)","points":20},{"number":429,"question":"QUOTATION QUESTION. How did Jesus make His requests known?","answer":"Who in the days of his flesh, when he had offered up prayers and supplications with strong crying and tears unto him that was able to save him from death, and was heard in that he feared…","reference":"(Hebrews 5:7)","points":20},{"number":430,"question":"What is sin?","answer":"Anything outside of God’s perfect will","reference":"(Romans 3:23)","points":20},{"number":431,"question":"QUOTATION QUESTION. How can I please God when I am tempted to be covetous?","answer":"Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee.","reference":"(Hebrews 13:5)","points":20},{"number":432,"question":"How can I please God when He sends abundance?","answer":"If I am faithful when I only have a little and I allow God to root covetousness out of my heart, I will not act foolishly when He sends abundance.","reference":"(Numbers 11:31-34; Luke 16:10)","points":20},{"number":433,"question":"QUOTATION QUESTION. How did Joshua and Caleb respond at Kadeshbarnea?","answer":"Rebel not ye against the LORD, neither fear ye the people of the land; for they are bread for us: their defense is departed from them, and the LORD is with us: fear them not.","reference":"(Numbers 14:9)","points":20},{"number":434,"question":"How did the children of Israel respond at Kadeshbarnea?","answer":"They wept.\nThey desired to have died in Egypt or in the desert.\nThey desired to make a new leader and return to Egypt.","reference":"(Numbers 14:1-4)","points":20},{"number":435,"question":"What happened to Joshua and Caleb in the desert?","answer":"They believed God and allowed His grace and power to change their lives.","reference":"(Numbers 14:24; 27:18; 32:11-12)","points":20},{"number":436,"question":"Why couldn’t the children of Israel believe God?","answer":"They had refused God’s voice, and God’s voice (which always brings His presence) gives the faith to believe.","reference":"(Exodus 20:18-21; Hebrews 12:18-20; 4:2; Romans 10:17)","points":20},{"number":437,"question":"QUOTATION QUESTION. According to Hebrews, why should I beware?","answer":"Lest there be in any of you an evil heart of unbelief in departing from the living God…","reference":"(NKJV Hebrews 3:12)","points":20},{"number":438,"question":"Why did the children of Israel fail every trial?","answer":"They didn’t love the Lord.\nThey weren’t humble (always thought they knew better than God).\nThey didn’t have faith to believe.","reference":"(Exodus 20:19-21; Psalm 106:13; Hebrews 3:19; 12:20; Romans 10:17)","points":20},{"number":439,"question":"QUOTATION QUESTION. What did Moses command the children of Israel about Korah, Dathan, and Abiram?","answer":"Depart now from the tents of these wicked men! Touch nothing of theirs, lest you be consumed in all their sins.","reference":"(NKJV Numbers 16:26)","points":20},{"number":440,"question":"QUOTATION QUESTION. What does the Bible say about the sin of rebellion?","answer":"For rebellion is as the sin of witchcraft, and stubbornness is as iniquity and idolatry.","reference":"(I Samuel 15:23)","points":20},{"number":441,"question":"Why was God angry with Balaam?","answer":"Even after Balaam knew that it was NOT God’s perfect will for him to go with King Balak, he insisted that God let him go.","reference":"(Numbers 22:12-22)","points":20},{"number":442,"question":"What will happen if I resist God’s perfect will and insist on doing things my way?","answer":"God will give me what I want, but I will lose His blessing.","reference":"(Numbers 22:12-22, 31-33; 31:8; Psalm 106:15; II Peter 2:15; Jude 1:11)","points":20},{"number":443,"question":"QUOTATION QUESTION. What is the root of all evil?","answer":"For the love of money is the root of all evil: which while some coveted after, they have erred from the faith, and pierced themselves through with many sorrows.","reference":"(I Timothy 6:10)","points":20},{"number":444,"question":"QUOTATION QUESTION. Why is it important that my name be found in the book of life?","answer":"And whosoever was not found written in the book of life was cast into the lake of fire.","reference":"(Revelation 20:15)","points":20},{"number":445,"question":"QUOTATION QUESTION. According to Romans, who will die and who will live?","answer":"For if you live according to the flesh you will die; but if by the Spirit you put to death the deeds of the body, you will live.","reference":"(NKJV Romans 8:13)","points":20},{"number":446,"question":"QUOTATION QUESTION. According to Hebrews, how are we to serve God and why?","answer":"…Let us have grace, whereby we may serve God acceptably with reverence and Godly fear: for our God is a consuming fire.","reference":"(Hebrews 12:28-29)","points":20},{"number":447,"question":"What lesson do I learn from the death of the old generation in the desert?","answer":"God wants to kill my carnal man (flesh, old nature) in the desert.\nI must be crucified with Christ in every area of my life.\n-QR\n(Numbers 32:13; I Corinthians 10:1-11; Galatians 2:20; 6:14)","reference":"","points":20},{"number":448,"question":"QUOTATION QUESTION. What is the testimony of those who enter into God’s promise?","answer":"I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me:","reference":"(Galatians 2:20)","points":20},{"number":449,"question":"QUOTATION QUESTION. Why did God miraculously divide the Jordan River?","answer":"That all the people of the earth might know the hand of the LORD, that it is mighty: that ye might fear the LORD your God for ever.","reference":"(Joshua 4:24)","points":20},{"number":450,"question":"QUOTATION QUESTION. How important is God’s Word?","answer":"All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, thoroughly furnished unto all good works.","reference":"(II Timothy 3:16-17)","points":20},{"number":451,"question":"QUOTATION QUESTION. How powerful is God’s Word?","answer":"For the word of God is quick, and powerful, and sharper than any two edged sword, piercing even to the dividing asunder of soul and spirit, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart.","reference":"(Hebrews 4:12)","points":30},{"number":452,"question":"QUOTATION QUESTION. How often does God want me to meditate on His words?","answer":"This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success.","reference":"(Joshua 1:8)","points":30},{"number":453,"question":"What four evidences do we have that the Bible has come from God?","answer":"The miracle of unity despite its many different authors\nThe miracle of unity despite the long period of time that it took to write\nIts prophecies which have been and are still being fulfilled\nThe world hates it","reference":"(Isaiah 35:1; Ezekiel 36:33-35; Amos 9:14; John 15:18-19; II Peter 3:5)","points":30},{"number":454,"question":"What are the books of the Law in the Old Testament?","answer":"Genesis Numbers\nExodus Deuteronomy\nLeviticus","reference":"","points":30},{"number":455,"question":"What are the books of history in the Old Testament?","answer":"Joshua I, II Chronicles\nJudges Ezra\nRuth Nehemiah","reference":"I, II Samuel Esther\nI, II Kings","points":30},{"number":456,"question":"What are the books of poetry in the Old Testament?","answer":"Job Ecclesiastes\nPsalms Song of Solomon\nProverbs","reference":"","points":30},{"number":457,"question":"What are the books of Major Prophets in the Old Testament?","answer":"Isaiah Ezekiel\nJeremiah Daniel\nLamentations","reference":"","points":30},{"number":458,"question":"What are the books of the Minor Prophets in the Old Testament?","answer":"Hosea Nahum\nJoel Habakkuk\nAmos Zephaniah\nObadiah Haggai\nJonah Zechariah\nMicah Malachi","reference":"","points":30},{"number":459,"question":"What are the epistles in the New Testament?","answer":"Romans Titus\nI, II Corinthians Philemon\nGalatians Hebrews\nEphesians James\nPhilippians I, II Peter\nColossians I, II, III John\nI, II Thessalonians Jude\nI, II Timothy","reference":"","points":30},{"number":460,"question":"What four groups show the seven steps of progression for reaching all that God has planned for my life?","answer":"Seven days of creation\nSeven men of faith\nSeven feasts of the Lord\nSeven steps in the tabernacle of Moses","reference":"","points":30},{"number":461,"question":"On the first day of Creation in my heart, what does God want to accomplish?","answer":"The beginning of a new creation as the light of Jesus shines on its darkness helping me to see my need for a Savior and helping me to open my heart to Him","reference":"(Genesis 1:3-5; Romans 2:4; II Corinthians 4:4; II Timothy 1:9-10)","points":30},{"number":462,"question":"On the second day of Creation in my heart, what does God want to accomplish?","answer":"A separation between my worldly ideas and thoughts (earthly waters) and His ideas and thoughts (heavenly waters)","reference":"(Genesis 1:6-7; Isaiah 55:8; Jeremiah 15:19)","points":30},{"number":463,"question":"QUOTATION QUESTION. What does God promise to do if I make a separation between His way and the world’s way?","answer":"Therefore thus saith the Lord, If thou return, then will I bring thee again, and thou shalt stand before me: and if thou take forth the precious from the vile, thou shalt be as my mouth…","reference":"(Jeremiah 15:19)","points":30},{"number":464,"question":"On the third day of Creation in my heart, what does God want to accomplish?","answer":"The right balance between time spent in God’s Word (the water) and time spent with the Holy Spirit moving on my heart (earth) so that my life will bring forth the fruit of His Spirit","reference":"(Genesis 1:9-12; John 5:39-40; 15:7-8; Acts 6:4)","points":30},{"number":465,"question":"What is the fruit of the Spirit?","answer":"Love Goodness\nJoy Faith\nPeace Meekness\nLongsuffering Temperance\nGentleness","reference":"(Galatians 5:22, 23)","points":30},{"number":466,"question":"On the fourth day of Creation in my heart, what does God want to accomplish?","answer":"A greater separation between light and darkness so that my eyes can see:\nJesus, the Sun of Righteousness\nJesus, in His church (the moon)\nJesus, in His messengers (the stars)","reference":"(Genesis 1:14-19; Malachi 4:2; Isaiah 30:26; Revelation 1:20)","points":30},{"number":467,"question":"QUOTATION QUESTION. Who will Jesus manifest Himself to?","answer":"He that hath my commandments, and keepeth them, he it is that loveth me: and he that loveth me shall be loved of my Father, and I will love him, and will manifest myself to him.","reference":"(John 14:21)","points":30},{"number":468,"question":"On the fifth day of Creation in my heart, what does God want to accomplish?","answer":"He wants the fulfillment of His promise and calling on my life to be made visible as the Word of God (the water) brings forth life in the highest (birds) and deepest sense (fish and great whales).","reference":"(Genesis 1:20-23; Romans 1:1; I Corinthians 1:1; II Corinthians 1:1)","points":30},{"number":469,"question":"On the sixth day of Creation in my heart, what does God want to accomplish?","answer":"He wants Christ, who is in the likeness of God, to COMPLETELY fill my heart.","reference":"(Genesis 1:26; Galatians 2:20; Colossians 1:27; Hebrews 13:20-21)","points":30},{"number":470,"question":"QUOTATION QUESTION. Who is given a new name?","answer":"Him that overcometh will I make a pillar in the temple of my God, and he shall go no more out: and I will write upon him the name of my God, and the name of the city of my God, which is new Jerusalem, which cometh down out of heaven from my God: and I will write upon him my new name.","reference":"(Revelation 3:12)","points":30},{"number":471,"question":"The rest of God brings what three blessings?","answer":"Rivers of God’s presence\nThe power of God’s resurrection life flowing from within\nSupernatural wisdom to see and know things the way God does","reference":"(John 7:37-39; Revelation 20:6; Genesis 2:19-20)","points":30},{"number":472,"question":"How does Satan try to deceive me?","answer":"He tries to make me doubt God’s Word.\nHe tries to make me believe that God is either too “hard” or too “soft”.\nHe tries to convince me to disobey.\nHe tries to convince me through my (carnal) appetite.","reference":"(Genesis 3:1-6)","points":30},{"number":473,"question":"Give three mistakes that Eve made in the garden.","answer":"She had a conversation with Satan.\nShe didn’t ask for counsel.\nShe didn’t have a clear understanding of what God had said.\nShe fixed her eyes on what God had forbidden.\nShe chose wisdom instead of God’s will.\nShe thought that her idea was better than God’s.\n-(Accept any three answers.)","reference":"(Genesis 2:16-17; 3:1-6; I Timothy 2:14; Psalm 101:3; 27:4; John 7:24)","points":30},{"number":474,"question":"List two ways God’s judgment is a blessing.","answer":"Sorrow moves me to remember my Creator, where I came from, and where I am going.\nWith man ruling over the woman, she would be kept safe from falling again into Satan’s trap.\nWithout access to the tree of life, man would not live forever in his fallen, sinful condition.","reference":"(Genesis 3:16-19; Proverbs 30:8-9; I Corinthians 11:3, 10) (Accept any two answers.)","points":30},{"number":475,"question":"Describe Cain.","answer":"He was not concerned about doing things God’s way.\nHe was not concerned about answering God.\nHe was a murderer and a liar.\nHe was not repentant.\nHe was unthankful.\nHe was hidden from God’s presence.\nHe sought for an inheritance in this world.\n(Accept any six answers.)","reference":"(Genesis 4:3-7)\n(Genesis 4:6-7)\n(Genesis 4:8-10)\n(Genesis 4:9-13)\n(Genesis 4:13-14; Psalm 100:4; Romans 1:21)\n(Genesis 4:14)\n(Genesis 4:17; Psalm 49:11)","points":30},{"number":476,"question":"Describe Abel.","answer":"He was concerned about doing things God’s way.\nHe was a prophet.\nHe was a man of faith.","reference":"(Hebrews 11:4)\n(Luke 11:50-51)\n(Hebrews 11:4)","points":30},{"number":477,"question":"Why are two completely different men living in Adam’s house?","answer":"They are a figure of two completely different men living in every Christian heart:\nThe flesh, the old man (carnal man), who is like Cain and\nJesus, the new man, who is like Abel.","reference":"(John 3:30; Romans 8:13; Ephesians 4:22-32; Colossians 3:5)","points":30},{"number":478,"question":"What four similarities are there between Noah’s day and my day?","answer":"Men’s actions and thoughts are continually evil.\nThere is no understanding of God’s ways.\nGod is grieved in His heart and brings judgment to the earth.\nMen who find grace in the eyes of the Lord will be saved.","reference":"(Genesis 6:1-14; Matthew 24:37-39)","points":30},{"number":479,"question":"QUOTATION QUESTION. What important word of advice does Hebrews give me?","answer":"Not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another: and so much the more, as ye see the day approaching.","reference":"(Hebrews 10:25)","points":30},{"number":480,"question":"QUOTATION QUESTION. What does Hebrews say about Noah?","answer":"By faith Noah, being warned of God of things not seen as yet, moved with fear, prepared an ark to the saving of his house; by the which he condemned the world, and became heir of the righteousness which is by faith.","reference":"(Hebrews 11:7)","points":30},{"number":481,"question":"QUOTATION QUESTION. According to the Second Epistle of Peter, what will be the attitude of some in the last days?","answer":"Knowing this first, that there shall come in the last days scoffers, walking after their own lusts, And saying, Where is the promise of his coming? for since the fathers fell asleep, all things continue as they were from the beginning of the creation.","reference":"(II Peter 3:3-4)","points":30},{"number":482,"question":"In my day, who will be saved from another flood - a flood of destruction?","answer":"Those who walk with God\nThose who fear God and are obedient to all of His instructions\nThose who remain in God’s church and endure until the end","reference":"(Genesis 6:8-9; Matthew 24:13, 37-42; Hebrews 11:7; Revelation 12:15)","points":30},{"number":483,"question":"Name seven things that Satan uses to bring a flood of destruction into my life and home.","answer":"Magazines\nTV\nBooks\nThe internet\nNewspapers\nFriendships with the ungodly\nMovies","reference":"(Jeremiah 9:21; Revelation 12:15)","points":30},{"number":484,"question":"QUOTATION QUESTION. What promise (or covenant) did God make with Abram?","answer":"Get out of your country, from your family and from your father’s house, to a land that I will show you. I will make you a great nation; I will bless you and make your name great; and you shall be a blessing. I will bless those who bless you, and I will curse him who curses you; and in you all the families of the earth shall be blessed.","reference":"(NKJV Genesis 12:1-3)","points":30},{"number":485,"question":"As a child of Abraham, God calls me to do what?","answer":"Make a separation in my heart from my country and family\nStart the same journey (in God) that Abraham took\nFinish the journey","reference":"(Genesis 12:1-5; Romans 4:16; Galatians 3:29; Hebrews 11:8)","points":30},{"number":486,"question":"What three kinds of Christians does Lot represent?","answer":"A Christian who believes that he knows better than God\nA Christian who has his eyes on an inheritance in this world\nA Christian who afflicts his soul but only to live more comfortably","reference":"(Genesis 13; 19:17-20; II Peter 2:7-9)","points":30},{"number":487,"question":"What four things do I learn from Abram and Lot’s separation?","answer":"A meeting with God will give me the power to be meek (surrender my rights).\nGod’s plan is always better than what I could ever imagine or choose.\nGod brings separation.\nGod wants to bless me by leading me on to the place of His presence.","reference":"(Genesis 13:4, 8-11, 14-18; Romans 4:13)","points":30},{"number":488,"question":"What testimony did Abram give Lot and the king of Sodom?","answer":"He was not interested in the things of Sodom and answered the king:\nI have lift up mine hand unto the Lord, the most high God, the possessor of heaven and earth, That I will not take from a thread even to a shoelatchet, and that I will not take any thing that is thine, lest thou shouldest say, I have made Abram rich:","reference":"(Genesis 14:21-23)","points":30},{"number":489,"question":"QUOTATION QUESTION. According to Malachi chapter 3, what will happen if I am not faithful to give God my tithes and offerings?","answer":"Will a man rob God? Yet ye have robbed me. But ye say, Wherein have we robbed thee? In tithes and offerings. Ye are cursed with a curse: for ye have robbed me, even this whole nation.","reference":"(Malachi 3:8-9)","points":30},{"number":490,"question":"As a child of Abraham, what does God's guarantee to Abraham mean for me?","answer":"If I surrender to the trials (the cross, the difficulties) that God sends, and I allow God to lead me, His grace will help me to inherit Abraham’s promise!","reference":"(Genesis 15:7-21; John 8:56; II Timothy 2:12; Hebrews 6:12-20)","points":30},{"number":491,"question":"Name six characteristics found in Abram’s life, but not in Lot’s life.","answer":"He walked with God.\nHe didn’t mind the difficulties that came from being a pilgrim (one who travels).\nHe built altars as he searched for God.\nHe received promises from God.\nHe was a man of faith because he heard God’s voice.\nHe was meek.","reference":"(Genesis 12-19)","points":30},{"number":492,"question":"What two aspects of Abraham’s faith does God want me to have?","answer":"He wants me to believe that my life can bring forth ALL of the life of Jesus (the promised Son of God) even though that might seem impossible.\nHe wants me to believe that Jesus (the promised Son of God) was offered upon the altar (the cross) and was raised from the dead.","reference":"(Ephesians 3:14-20; Colossians 1:27; Hebrews 13:20-21; Romans 4:24)","points":30},{"number":493,"question":"What five qualities does God look for in His bride that we see in the life of Rebekah?","answer":"From the family of God\nA willingness to obey the Holy Spirit without delay\nUnderstanding how to correctly respond to trials\nBeautiful to Jesus\nNot loving other gods and other things\nDiligent","reference":"(Accept any five answers.)\n(Genesis 24:5, 55-58)\n(Genesis 24:4; John 17:11, 14)\n(Genesis 24:11, 19-20)\n(Genesis 24:16; Psalm 45:10-11)\n(Genesis 24:16; Ezekiel 44:9-16)\n(Genesis 24:17-22)","points":30},{"number":494,"question":"QUOTATION QUESTION. Who hear and obey Jesus, and what is the result?","answer":"My sheep hear my voice, and I know them, and they follow me: And I give unto them eternal life; and they shall never perish, neither shall any man pluck them out of my hand.","reference":"(John 10:27-28)","points":30},{"number":495,"question":"What four consequences did Jacob receive for deceiving his father?","answer":"He never saw his mother again.\nHe worked hard for his deceiving uncle for 20 years.\nHe was deceived into receiving Leah as his wife instead of Rachel.\nHe was deceived by his own sons about what happened to Joseph.","reference":"(Genesis 27:41-45; 29:25; 31:38-42; 37:32-35)","points":30},{"number":496,"question":"QUOTATION QUESTION. What does God say about the humble?","answer":"For thus saith the high and lofty One that inhabiteth eternity, whose name is Holy; I dwell in the high and holy place, with him also that is of a contrite and humble spirit, to revive the spirit of the humble, and to revive the heart of the contrite ones.","reference":"(Isaiah 57:15)","points":30},{"number":497,"question":"Name the twelve sons of Jacob (Israel).","answer":"Reuben Dan\nSimeon Joseph\nLevi Benjamin\nJudah Naphtali\nIssachar Gad\nZebulun Asher","reference":"(Genesis 35:23-26; I Chronicles 2:1-2)","points":30},{"number":498,"question":"QUOTATION QUESTION. Why did the Lord stay close to Joseph?","answer":"The righteous cry, and the LORD heareth, and delivereth them out of all their troubles. The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit. Many are the afflictions of the righteous: but the LORD delivereth him out of them all.","reference":"(Psalm 34:17-19)","points":30},{"number":499,"question":"QUOTATION QUESTION. If I am careful with the “little” things in my life, what will Jesus say to me one day?","answer":"Well done, thou good and faithful servant: thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord.","reference":"(Matthew 25:21)","points":30},{"number":500,"question":"QUOTATION QUESTION. What does God do when His children surrender their lives to His mercy?","answer":"He raises the poor from the dust and lifts the beggar from the ash heap, to set them among princes and make them inherit the throne of glory.","reference":"(NKJV I Samuel 2:8)","points":30},{"number":501,"question":"QUOTATION QUESTION. What is love?","answer":"Love suffers long and is kind; love does not envy; love does not parade itself, is not puffed up; does not behave rudely, does not seek its own, is not provoked, thinks no evil; does not rejoice in iniquity, but rejoices in the truth; bears all things, believes all things, hopes all things, endures all things.","reference":"(NKJV I Corinthians 13:4-7)","points":30},{"number":502,"question":"QUOTATION QUESTION. Does God care if I forgive my brother?","answer":"For if ye forgive men their trespasses, your heavenly Father will also forgive you: But if ye forgive not men their trespasses, neither will your Father forgive your trespasses.","reference":"(Matthew 6:14-15)","points":30},{"number":503,"question":"QUOTATION QUESTION. How and why was Moses hid of his parents?","answer":"By faith Moses, when he was born, was hid three months of his parents, because they saw he was a proper child; and they were not afraid of the king's commandment.","reference":"(Hebrews 11:23)","points":30},{"number":504,"question":"Name five reasons why God takes me through desert experiences.","answer":"To humble me\nTo give me the inheritance\nTo learn to depend on Him alone\nTo give me the opportunity to know His miracle working power\nTo become strong in Him\nTo know what is in my heart, whether I will keep his commandments, or not\n-(Accept any five answers.)","reference":"(Deuteronomy 8:2-9, 16; Isaiah 40:28-31; I Corinthians 10:1-11)","points":30},{"number":505,"question":"How did Moses become meek and humble?","answer":"He forsook the kingdom of Egypt.\nHe embraced the desert God had chosen for him.\nHe accepted the job of a shepherd (a position that was abominable to the Egyptians).","reference":"(Genesis 46:34; Exodus 3:1; Hebrews 11:27)","points":30},{"number":506,"question":"QUOTATION QUESTION. Should I boast of my own wisdom and might?","answer":"Thus saith the LORD, Let not the wise man glory in his wisdom, neither let the mighty man glory in his might, let not the rich man glory in his riches: But let him that glorieth glory in this, that he understandeth and knoweth me…","reference":"(Jeremiah 9:23, 24a)","points":30},{"number":507,"question":"QUOTATION QUESTION. What happens when I cry out to God for help?","answer":"In my distress I called upon the LORD, and cried to my God: and he did hear my voice out of his temple, and my cry did enter into his ears.\nHe delivered me from my strong enemy, and from them that hated me:\nfor they were too strong for me.","reference":"(II Samuel 22:7, 18)","points":30},{"number":508,"question":"What were the ten plagues that fell on Egypt?","answer":"Water turned to blood Boils\nFrogs Hail\nLice Locusts\nFlies Darkness\nPlague on the cattle Death of all the firstborn","reference":"(Exodus 7-12)","points":30},{"number":509,"question":"What four compromises did Pharaoh try to make with Moses?","answer":"Sacrifice in Egypt\nDon’t go too far.\nLeave your children behind.\nLeave your possessions behind.","reference":"(Exodus 8:25)\n(Exodus 8:27-28)\n(Exodus 10:8-11)\n(Exodus 10:24)","points":30},{"number":510,"question":"What four things does water baptism represent?","answer":"It represents crossing Egypt’s border to be out of Pharaoh’s (Satan’s) control.\nIt represents coming under God’s control.\nIt represents an act of faith and obedience to God.\nIt represents a desire to bury my old way of life (man) and be raised to a new way of life in Jesus.","reference":"(Exodus 14; Acts 2:38; Romans 6:3-13; I Corinthians 10:1-2)","points":30},{"number":511,"question":"What four promises has God made to His children?","answer":"He will rescue them from bondage.\nHe will redeem them.\nHe will be their God and they will be His people.\nHe will give them the land that He promised to Abraham, Isaac, and Jacob.","reference":"(Exodus 6:6-8; Romans 8:29; Ephesians 2:6; Colossians 1:13-14)","points":30},{"number":512,"question":"How did God deliver the children of Israel at the Red Sea?","answer":"And Moses stretched out his hand over the sea; and the LORD caused the sea to go back by a strong east wind all that night, and made the sea dry land, and the waters were divided.","reference":"(Exodus 14:21)","points":30},{"number":513,"question":"List five of the ten trials that God sent to the children of Israel.","answer":"Captivity at the Red Sea\nBitter experiences at Marah\nInsufficient provision in the wilderness of Sin\nTrial of obedience with manna\nDryness and thirst at Rephidim\nDesolation and lack of progress at Mount Horeb\nUnthankfulness at Taberah\nTrial with their stomach (appetite)\nCovetousness at Kibrothhattaavah\nTrial of trusting and believing the Lord at Kadeshbarnea\n(Accept any five answers.)","reference":"(Exodus 14:1-12)\n(Exodus 15:22-26)\n(Exodus 16:1-3)\n(Exodus 16:4, 16-28)\n(Exodus 17:1-7)\n(Exodus 24:1-18; 32:1)\n(Numbers 10:12-13, 33-34; 11:1-3)\n(Numbers 11:4-10)\n(Numbers 11:31-34)\n(Numbers 13-14)","points":30},{"number":514,"question":"In what four ways did the children of Israel displease God in their trials?","answer":"They tempted God and forgot His works.\nThey didn’t wait for His counsel.\nThey murmured against their leaders.\nThey rejected every opportunity to know and believe the Lord.","reference":"(Exodus 17:1-4, Numbers 14:2, 22; Psalm 78:40-53; 95:9; 106:13-14)","points":30},{"number":515,"question":"List six ways I can overcome Amalek (the carnal man in me).","answer":"Deny myself and fight a good fight\nMeet with God\nObey\nUnity and help from the body of Christ\nWorship (Exodus 17:11; Zechariah 10:3)\nThe Word of God (Exodus 17:13; Ephesians 6:17)\n(Exodus 17:9)\n(Exodus 17:10; Hebrews 13:17)\n(Exodus 17:10)","reference":"","points":30},{"number":516,"question":"What four things happened at Mount Sinai?","answer":"God gave Moses the Ten Commandments and the law.\nGod gave Moses the pattern for building the Tabernacle of Moses.\nThe children of Israel worshipped and sacrificed to the golden calf.\nThe Tabernacle of Moses was built.","reference":"(Exodus 19-40)","points":30},{"number":517,"question":"QUOTATION QUESTION. Who will the baptism in the Holy Spirit be given to?","answer":"Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you. If ye then, being evil, know how to give good gifts unto your children: how much more shall your heavenly Father give the Holy Spirit to them that ask him?","reference":"(Luke 11:9, 13)","points":30},{"number":518,"question":"QUOTATION QUESTION. According to the Gospel of John, what is the connection between lying and the devil?","answer":"Ye are of your father the devil, and the lusts of your father ye will do. He was a murderer from the beginning, and abode not in the truth, because there is no truth in him. When he speaketh a lie, he speaketh of his own: for he is a liar, and the father of it.","reference":"(John 8:44)","points":30},{"number":519,"question":"QUOTATION QUESTION. What must I do to follow Jesus?","answer":"If any man will come after me, let him deny himself, and take up his cross, and follow me. For whosoever will save his life shall lose it: and whosoever will lose his life for my sake shall find it. For what is a man profited, if he shall gain the whole world, and lose his own soul? Or what shall a man give in exchange for his soul?","reference":"(Matthew 16:24-26)","points":30},{"number":520,"question":"QUOTATION QUESTION. As a Christian, how should I live to not end my life being rejected by God?","answer":"I therefore so run, not as uncertainly; so fight I, not as one that beateth the air: But I keep under my body, and bring it into subjection: lest that by any means, when I have preached to others, I myself should be a castaway.","reference":"(I Corinthians 9:26, 27)","points":30},{"number":521,"question":"What materials were used to build the tabernacle?","answer":"Gold Badger’s skins\nSilver Shittim wood\nBrass Oil\nBlue, purple, scarlet, and fine linen Spices\nGoats’ hair Precious stones\nRams’ skins dyed red","reference":"(Exodus 25:3-8)","points":30},{"number":522,"question":"QUOTATION QUESTION. What did God command the priests to do forever at the laver and why?","answer":"They shall wash their hands and their feet, that they die not: and it shall be a statute for ever to them, even to him and to his seed throughout their generations.","reference":"(Exodus 30:21)","points":30},{"number":523,"question":"As a priest unto God, what kinds of sacrifices can I offer?","answer":"Sacrifices of joy\nSacrifices of thanksgiving\nSacrifices of righteousness\nSacrifices of a broken spirit\nSacrifices of doing good and sharing with others","reference":"(Psalm 27:6)\n(Numbers 18:24; Leviticus 7:13-14)\n(Psalm 4:5)\n(Psalm 51:17)\n(Hebrews 13:16)","points":30},{"number":524,"question":"What is the continual sacrifice that God is looking for and what does He promise to do there?","answer":"It is a daily sacrifice of praise and thanksgiving given to God morning and evening in which God promises to meet with me, talk with me, sanctify me, and make me His dwelling place.","reference":"(Exodus 29:42-44)","points":30},{"number":525,"question":"QUOTATION QUESTION. How important was the continual sacrifice to David?","answer":"Surely I will not come into the tabernacle of my house, nor go up into my bed; I will not give sleep to mine eyes, or slumber to mine eyelids, Until I find out a place for the Lord, an habitation for the mighty God of Jacob.","reference":"(Psalm 132:3-5)","points":30},{"number":526,"question":"Name four things that will make my continual sacrifice unacceptable to the Lord.","answer":"Not loving the truth\nNot tithing\nNot being careful with the words I speak\nDispleasing God in some way","reference":"(Psalm 50:16-20)","points":30},{"number":527,"question":"Describe the priest that pleases God.","answer":"The law of truth is in his mouth.\nIniquity is not found in his lips.\nHe walks with God in peace and righteousness.\nHe turns many away from iniquity.\nHis lips keep knowledge.\nHe seeks the law from God’s mouth.\nHe is the messenger of the LORD of hosts.\n(Accept any six answers.)","reference":"(Malachi 2:6-7)","points":30},{"number":528,"question":"What four things happened at Kibrothhattaavah?","answer":"The children of Israel coveted meat and spoke against God.\nFor a whole month God gave them meat.\nGod was angry and struck the people with a very great plague.\nThey buried the people who had been covetous.","reference":"(Numbers 11:31-34; Psalm 78:18-31)","points":30},{"number":529,"question":"QUOTATION QUESTION. How did God respond at Kadeshbarnea?","answer":"I have heard the murmurings of the children of Israel, which they murmur against me. Say unto them, As truly as I live, saith the LORD, as ye have spoken in mine ears, so will I do to you: Your carcases shall fall in this wilderness…","reference":"(Numbers 14:27-29)","points":30},{"number":530,"question":"QUOTATION QUESTION. According to Jude, what happened with those God had once saved and why?","answer":"But I want to remind you, though you once knew this, that the Lord, having saved the people out of the land of Egypt, afterward destroyed those who did not believe.","reference":"(NKJV Jude 1:5)","points":30},{"number":531,"question":"QUOTATION QUESTION. What happened to Korah, Dathan and Abiram?","answer":"The earth opened its mouth and swallowed them up, with their households and all the men with Korah, with all their goods.\nSo they and all those with them went down alive into the pit; the earth closed over them, and they perished from among the assembly.","reference":"(NKJV Numbers 16:32-33)","points":30},{"number":532,"question":"QUOTATION QUESTION. What should be my attitude towards those who call themselves Christians and choose to live in sin?","answer":"But now I have written unto you not to keep company, if any man that is called a brother be a fornicator, or covetous, or an idolater, or a railer, or a drunkard, or an extortioner; with such an one no not to eat.","reference":"(1 Corinthians 5:11)","points":30},{"number":533,"question":"QUOTATION QUESTION. What does James say about the danger of the tongue?","answer":"And the tongue is a fire, a world of iniquity: so is the tongue among our members, that it defileth the whole body, and setteth on fire the course of nature; and it is set on fire of hell.","reference":"(James 3:6)","points":30},{"number":534,"question":"QUOTATION QUESTION. Why is it important that I conquer my enemies?","answer":"He that overcometh, the same shall be clothed in white raiment; and I will not blot out his name out of the book of life, but I will confess his name before my Father, and before his angels.","reference":"(Revelation 3:5)","points":30},{"number":535,"question":"QUOTATION QUESTION. Who has God chosen and why?","answer":"…God has chosen the weak things of the world to put to shame the things which are mighty; and the base things of the world and the things which are despised God has chosen, and the things which are not, to bring to nothing the things that are, that no flesh should glory in His presence.","reference":"(NKJV I Corinthians 1:27-29)","points":30},{"number":536,"question":"What does the crossing of the Jordan River represent?","answer":"The work that God began in my life at water baptism (Red sea) is complete.\nThe carnal man (which I allowed God to kill) is left behind in the desert.\nI am raised in resurrection life as a new person.\nJesus completely fills my life and I am perfect.","reference":"(Joshua 4:23; 5:1, 9; I Corinthians 10:1-2; Colossians 2:11-12)","points":30}];

const CATEGORY_RANGES = {
  10: { min: 1,   max: 253, label: "10 Points", desc: "Questions #1–253"   },
  20: { min: 254, max: 450, label: "20 Points", desc: "Questions #254–450" },
  30: { min: 451, max: 536, label: "30 Points", desc: "Questions #451–536" },
};

const PT_CFG = {
  10: { color:"#2563eb", bg:"rgba(96,165,250,0.10)",  border:"#bfdbfe",  badge:"#1d4ed8" },
  20: { color:"#9a4a10", bg:"rgba(251,191,36,0.10)",  border:"rgba(251,191,36,0.30)",  badge:"#b45309" },
  30: { color:"#dc2626", bg:"#fef2f2", border:"#fecaca", badge:"#b91c1c" },
};

// Shared range config used by QuestionRuling, RoundQuizzingWindow, and CreateRoundSet
const CR_RANGES = {
  10: { min: 1,   max: 253, label: "10 Points", desc: "Questions #1–253",   color: "#60a5fa", bg: "rgba(96,165,250,0.10)",  border: "rgba(96,165,250,0.30)",  badge: "#1d4ed8" },
  20: { min: 254, max: 450, label: "20 Points", desc: "Questions #254–450", color: "#fbbf24", bg: "rgba(251,191,36,0.10)",  border: "rgba(251,191,36,0.30)",  badge: "#b45309" },
  30: { min: 451, max: 536, label: "30 Points", desc: "Questions #451–536", color: "#dc2626", bg: "rgba(248,113,113,0.10)", border: "rgba(248,113,113,0.30)", badge: "#b91c1c" },
};

// ── helpers ──────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(pool, n) {
  return shuffle(pool).slice(0, n);
}

// ── Dual-handle range slider ─────────────────────────────────────────────────
function RangeSlider({ pts, min, max, value, onChange }) {
  const c = PT_CFG[pts];
  const total = max - min || 1;
  const lp = ((value[0] - min) / total) * 100;
  const rp = ((value[1] - min) / total) * 100;
  return (
    <div style={{ position:"relative", height:44, userSelect:"none", marginBottom:4 }}>
      <div style={{ position:"absolute", top:16, left:0, right:0, height:6, background:"#ede8e0", borderRadius:3 }} />
      <div style={{ position:"absolute", top:16, height:6, borderRadius:3, left:`${lp}%`, width:`${rp-lp}%`, background:`linear-gradient(90deg,${c.badge},${c.color})` }} />
      <input type="range" min={min} max={max} value={value[0]}
        onChange={e => onChange([Math.min(Number(e.target.value), value[1]), value[1]])}
        style={{ position:"absolute", width:"100%", top:10, opacity:0, cursor:"pointer", zIndex: value[0] > max-5 ? 5 : 3, height:24 }} />
      <input type="range" min={min} max={max} value={value[1]}
        onChange={e => onChange([value[0], Math.max(Number(e.target.value), value[0])])}
        style={{ position:"absolute", width:"100%", top:10, opacity:0, cursor:"pointer", zIndex:4, height:24 }} />
      {[lp, rp].map((pct, i) => (
        <div key={i} style={{ position:"absolute", top:11, left:`${pct}%`, transform:"translateX(-50%)", width:14, height:14, borderRadius:"50%", background:`linear-gradient(135deg,${c.badge},${c.color})`, boxShadow:`0 0 0 2px #ffffff,0 0 0 4px ${c.border}`, pointerEvents:"none" }} />
      ))}
      {[{pct:lp,v:value[0]},{pct:rp,v:value[1]}].map(({pct,v},i) => (
        <div key={i} style={{ position:"absolute", top:30, left:`${pct}%`, transform:"translateX(-50%)", fontSize:10, color:c.color, fontFamily:"'Cinzel',serif", whiteSpace:"nowrap", pointerEvents:"none" }}>#{v}</div>
      ))}
    </div>
  );
}

// ── Category panel ───────────────────────────────────────────────────────────
function CategoryPanel({ pts, enabled, onToggle, range, onRange }) {
  const c = PT_CFG[pts];
  const cr = CATEGORY_RANGES[pts];
  const total = ALL_QUESTIONS.filter(q => q.points === pts).length;
  const selected = ALL_QUESTIONS.filter(q => q.points===pts && q.number>=range[0] && q.number<=range[1]).length;
  return (
    <div style={{ border:`1px solid ${enabled?c.border:"rgba(255,255,255,0.07)"}`, borderRadius:12, background:enabled?c.bg:"rgba(255,255,255,0.02)", padding:"14px 16px", marginBottom:10, transition:"all .2s" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:enabled?18:0 }}>
        <div onClick={onToggle} style={{ width:20, height:20, borderRadius:5, flexShrink:0, cursor:"pointer", border:`2px solid ${enabled?c.color:"rgba(255,255,255,0.2)"}`, background:enabled?c.color:"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {enabled && <span style={{ color:"#fff", fontSize:13, lineHeight:1 }}>✓</span>}
        </div>
        <div style={{ flex:1, cursor:"pointer" }} onClick={onToggle}>
          <div style={{ fontFamily:"'Cinzel',serif", fontWeight:700, fontSize:13, color:enabled?c.color:"#a89c92", letterSpacing:"0.06em" }}>{cr.label}</div>
          <div style={{ fontSize:11, color:enabled?c.color:"#7a6f64", marginTop:1, fontStyle:"italic" }}>{cr.desc}</div>
        </div>
        <div style={{ background:enabled?c.bg:"#f0ebe3", color:enabled?c.color:"#7a6f64", border:`1px solid ${enabled?c.border:"#d4c9bc"}`, borderRadius:12, padding:"4px 10px", fontSize:11, fontFamily:"'Cinzel',serif", textAlign:"center", lineHeight:1.4 }}>
          <div style={{ fontWeight:700, fontSize:12 }}>{enabled?selected:"—"}</div>
          <div style={{ fontSize:12, fontWeight:600, color:enabled?c.color:"#7a6f64" }}>/ {total}</div>
        </div>
      </div>
      {enabled && (
        <div>
          <RangeSlider pts={pts} min={cr.min} max={cr.max} value={range} onChange={onRange} />
          <div style={{ display:"flex", gap:8, marginTop:16 }}>
            {[["FROM", 0, cr.min, range[1], v => onRange([Math.max(cr.min, Math.min(v, range[1])), range[1]])],
              ["TO",   1, range[0], cr.max, v => onRange([range[0], Math.min(cr.max, Math.max(v, range[0]))])]
            ].map(([lbl, idx, lo, hi, fn]) => (
              <div key={lbl} style={{ flex:1 }}>
                <div style={{ fontSize:11, color:c.color, fontFamily:"'Cinzel',serif", letterSpacing:"0.08em", marginBottom:5, fontWeight:700 }}>{lbl}</div>
                <input type="number" min={lo} max={hi} value={range[idx]}
                  onChange={e => fn(Number(e.target.value))}
                  style={{ width:"100%", boxSizing:"border-box", background:"#f7f3ee", border:`1px solid ${c.border}`, borderRadius:7, padding:"7px 10px", color:"#1c1410", fontFamily:"Inter,system-ui,sans-serif", fontSize:16, outline:"none" }} />
                <div style={{ fontSize:11, color:c.color, marginTop:3, fontFamily:"'Cinzel',serif", fontWeight:600 }}>{lbl==="FROM"?`min:#${cr.min}`:`max:#${cr.max}`}</div>
              </div>
            ))}
            <div style={{ display:"flex", alignItems:"center", paddingTop:20 }}>
              <button onClick={() => onRange([cr.min, cr.max])} title="Reset" style={{ padding:"7px 10px", borderRadius:6, cursor:"pointer", background:"#f0ebe3", border:`1px solid ${c.border}`, color:c.color, fontSize:15 }}>↺</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Quiz card (browse view) ──────────────────────────────────────────────────
function QuizCard({ q, quizMode, revealed, onReveal, showRef }) {
  const c = PT_CFG[q.points];
  const showAns = !quizMode || revealed;
  return (
    <div style={{ background:c.bg, border:`1px solid ${c.border}`, borderRadius:14, padding:"18px 22px", marginBottom:12, boxShadow:"0 2px 16px rgba(0,0,0,0.22)" }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:showAns?14:4 }}>
        <div style={{ minWidth:40, height:40, borderRadius:8, background:`linear-gradient(135deg,${c.badge},${c.color})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cinzel',serif", fontWeight:700, fontSize:14, color:"#fff", flexShrink:0 }}>{q.number}</div>
        <p style={{ margin:0, flex:1, fontFamily:"Inter,system-ui,sans-serif", fontSize:18, color:"#1c1410", lineHeight:1.5 }}>{q.question||<em style={{color:"#a89c92"}}>(no question text)</em>}</p>
        <span style={{ background:c.bg, border:`2px solid ${c.color}`, color:c.color, borderRadius:20, padding:"3px 11px", fontSize:11, fontFamily:"'Cinzel',serif", fontWeight:700, letterSpacing:"0.08em", flexShrink:0 }}>{q.points} pts</span>
      </div>
      {quizMode && !revealed && (
        <button onClick={onReveal} style={{ marginLeft:52, padding:"6px 16px", borderRadius:6, background:"transparent", border:`1px solid ${c.color}`, color:c.color, fontFamily:"'Cinzel',serif", fontSize:11, cursor:"pointer" }}>Reveal Answer</button>
      )}
      {showAns && (
        <div style={{ paddingLeft:52 }}>
          <div style={{ background:"#f0ebe3", borderLeft:`3px solid ${c.color}`, borderRadius:"0 8px 8px 0", padding:"10px 14px" }}>
            <span style={{ fontSize:11, letterSpacing:"0.1em", color:c.color, fontFamily:"'Cinzel',serif", textTransform:"uppercase", fontWeight:700 }}>Answer</span>
            <p style={{ margin:"4px 0 0", fontFamily:"Inter,system-ui,sans-serif", fontSize:17, color:"#1c1410", lineHeight:1.55, whiteSpace:"pre-line" }}>{q.answer||<em style={{color:"#a89c92"}}>(see reference)</em>}</p>
          </div>
          {showRef && q.reference && (
            <div style={{ marginTop:8, display:"flex", gap:6, alignItems:"flex-start" }}>
              <span style={{ fontSize:11, color:"#0369a1", fontFamily:"'Cinzel',serif", letterSpacing:"0.08em", marginTop:2, fontWeight:700 }}>REF</span>
              <p style={{ margin:0, fontSize:13, color:"#0369a1", fontFamily:"Inter,system-ui,sans-serif", fontStyle:"italic" }}>{q.reference}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Create Round Window ──────────────────────────────────────────────────────
function TeamSetup({ color, teamName, accent, bg, border, quizzers, setQuizzers }) {
  const addQuizzer = () => {
    if (quizzers.length >= 8) return;
    const isStarter = quizzers.length < 4;
    const subNum = quizzers.length - 3;
    const name = isStarter ? `${teamName} ${quizzers.length + 1}` : `Substitute ${subNum}`;
    setQuizzers([...quizzers, { id: Date.now(), name }]);
  };
  const removeQuizzer = (id) => {
    if (quizzers.length <= 1) return;
    setQuizzers(quizzers.filter(q => q.id !== id));
  };
  const rename = (id, name) => setQuizzers(quizzers.map(q => q.id === id ? { ...q, name } : q));

  const starters = quizzers.slice(0, 4);
  const subs     = quizzers.slice(4);

  return (
    <div style={{
      border: `2px solid ${border}`, borderRadius: 16,
      background: bg, padding: "20px 18px", display: "flex", flexDirection: "column", gap: 14,
    }}>
      {/* Team header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10, flexShrink: 0,
          background: `linear-gradient(135deg, ${accent}aa, ${accent})`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
        }}>{color === "red" ? "🔴" : "🟢"}</div>
        <div>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 17, fontWeight: 700, color: accent, letterSpacing: "0.04em" }}>{teamName}</div>
          <div style={{ fontSize: 13, color: `${accent}99`, fontStyle: "italic", marginTop: 2 }}>
            {starters.length} starter{starters.length !== 1 ? "s" : ""}{subs.length > 0 ? ` · ${subs.length} sub${subs.length !== 1 ? "s" : ""}` : ""}
          </div>
        </div>
      </div>

      {/* Starters */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: accent, fontFamily: "'Cinzel',serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>Starters</div>
        {starters.map((q, i) => (
          <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 32, height: 44, borderRadius: 8, flexShrink: 0,
              background: `${accent}22`, border: `1px solid ${border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Cinzel',serif", fontSize: 13, color: accent, fontWeight: 700,
            }}>{i + 1}</div>
            <input
              value={q.name}
              onChange={e => rename(q.id, e.target.value)}
              style={{
                flex: 1, background: "#fffefb", border: `1px solid ${border}`,
                borderRadius: 8, padding: "11px 14px", color: "#1c1410",
                fontFamily: "Inter,system-ui,sans-serif", fontSize: 16, outline: "none",
                minWidth: 0,
              }}
              placeholder={`${teamName} ${i + 1}`}
            />
            <button onClick={() => removeQuizzer(q.id)} disabled={quizzers.length <= 1} style={{
              width: 36, height: 44, borderRadius: 8, border: "1px solid #e2d9cf",
              cursor: quizzers.length <= 1 ? "default" : "pointer",
              background: "#f7f3ee", color: quizzers.length <= 1 ? "#d1d5db" : "#6b7280",
              fontSize: 18, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>×</button>
          </div>
        ))}
      </div>

      {/* Substitutes */}
      {subs.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: accent, fontFamily: "'Cinzel',serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>Substitutes</div>
            <div style={{ flex: 1, height: 1, background: `${accent}33` }} />
          </div>
          <div style={{ fontSize: 12, color: `${accent}88`, fontStyle: "italic", marginTop: -4, marginBottom: 2 }}>6 correct or 3 incorrect = eligible</div>
          {subs.map((q, i) => (
            <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 32, height: 44, borderRadius: 8, flexShrink: 0,
                background: "#f7f3ee", border: `1px dashed ${border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Cinzel',serif", fontSize: 13, color: accent, fontWeight: 700, opacity: 0.6,
              }}>S{i + 1}</div>
              <input
                value={q.name}
                onChange={e => rename(q.id, e.target.value)}
                style={{
                  flex: 1, background: "#fffefb", border: `1px dashed ${border}`,
                  borderRadius: 8, padding: "11px 14px", color: "#6b7280",
                  fontFamily: "Inter,system-ui,sans-serif", fontSize: 16, outline: "none",
                  minWidth: 0,
                }}
                placeholder={`Sub ${i + 1}`}
              />
              <button onClick={() => removeQuizzer(q.id)} style={{
                width: 36, height: 44, borderRadius: 8, border: "1px solid #e2d9cf", cursor: "pointer",
                background: "#f7f3ee", color: "#9ca3af", fontSize: 18, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>×</button>
            </div>
          ))}
        </div>
      )}

      {/* Add buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        {starters.length < 4 && (
          <button onClick={addQuizzer} style={{
            flex: 1, padding: "12px", borderRadius: 10, cursor: "pointer",
            background: "#fffefb", border: `1px dashed ${border}`,
            color: accent, fontFamily: "'Cinzel',serif", fontSize: 13, letterSpacing: "0.04em",
          }}>+ Add Starter</button>
        )}
        {starters.length >= 4 && quizzers.length < 8 && (
          <button onClick={addQuizzer} style={{
            flex: 1, padding: "12px", borderRadius: 10, cursor: "pointer",
            background: "#f7f3ee", border: `1px dashed ${border}`,
            color: accent, opacity: 0.75, fontFamily: "'Cinzel',serif", fontSize: 13, letterSpacing: "0.04em",
          }}>+ Add Substitute</button>
        )}
      </div>
    </div>
  );
}

// ── QuestionRuling component ──────────────────────────────────────────────────
function QuestionRuling({ question, quizzer, team, onRuling, onCancel }) {
  const [interrupted, setInterrupted] = useState(null);
  const [correct, setCorrect] = useState(null);

  const teamColor  = team === "red" ? "#dc2626" : "#16a34a";
  const teamBg     = team === "red" ? "#fef2f2"  : "#f0fdf4";
  const teamBorder = team === "red" ? "#fecaca"  : "#bbf7d0";
  const teamEmoji  = team === "red" ? "🔴" : "🟢";
  const cfg = CR_RANGES[question.points];

  const canSubmit = interrupted !== null && correct !== null;

  const deduction = Math.floor(question.points / 2);

  const submit = () => {
    if (!canSubmit) return;
    onRuling({
      quizzer, team, interrupted, correct,
      points:    correct ? question.points : 0,
      deduction: correct ? 0 : deduction,
    });
  };

  const ToggleBtn = ({ active, onClick, label, activeColor, activeBg, activeBorder, icon }) => (
    <button onClick={onClick} style={{
      flex: 1, padding: "14px 10px", borderRadius: 10, cursor: "pointer",
      border: `2px solid ${active ? activeBorder : "#e5e7eb"}`,
      background: active ? activeBg : "#f9fafb",
      color: active ? activeColor : "#9ca3af",
      fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em",
      transition: "all .15s", display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
    }}>
      <span style={{ fontSize: 22 }}>{icon}</span>
      <span>{label}</span>
    </button>
  );

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 4000,
      background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Inter,system-ui,sans-serif", color: "#1c1410",
      padding: "24px",
    }}>
      <div style={{
        background: "#fffefb", border: "1px solid #e5e7eb",
        borderRadius: 20, width: "100%", maxWidth: 540,
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ background: teamBg, borderBottom: `1px solid ${teamBorder}`, padding: "16px 22px", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20 }}>{teamEmoji}</span>
          <div>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 15, fontWeight: 700, color: teamColor, letterSpacing: "0.06em" }}>Question Ruling</div>
            <div style={{ fontSize: 13, color: teamColor, opacity: .8, marginTop: 2 }}>{quizzer} · {question.points}-point question</div>
          </div>
          <div style={{ marginLeft: "auto", background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 8, padding: "4px 12px", fontFamily: "'Cinzel',serif", fontSize: 11, color: cfg.color, fontWeight: 700 }}>{question.points} pts</div>
        </div>

        <div style={{ padding: "22px 22px", display: "flex", flexDirection: "column", gap: 22 }}>
          {/* Question preview */}
          <div style={{ background: "#f7f3ee", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ fontSize: 10, color: "#6b7280", fontFamily: "'Cinzel',serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Question</div>
            <p style={{ margin: 0, fontSize: 15, color: "#1c1410", lineHeight: 1.5 }}>{question.question}</p>
          </div>

          {/* Interrupted? */}
          <div>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: "#b45309", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Was the question interrupted?</div>
            <div style={{ display: "flex", gap: 10 }}>
              <ToggleBtn active={interrupted === true}  onClick={() => setInterrupted(true)}
                label="Interrupted" icon="✋" activeColor="#d97706" activeBg="#fffbeb" activeBorder="#fcd34d" />
              <ToggleBtn active={interrupted === false} onClick={() => setInterrupted(false)}
                label="Not Interrupted" icon="📖" activeColor="#2563eb" activeBg="#eff6ff" activeBorder="#bfdbfe" />
            </div>
          </div>

          {/* Correct? */}
          <div>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: "#b45309", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Was the answer correct?</div>
            <div style={{ display: "flex", gap: 10 }}>
              <ToggleBtn active={correct === true}  onClick={() => setCorrect(true)}
                label="Correct" icon="✅" activeColor="#16a34a" activeBg="#f0fdf4" activeBorder="#bbf7d0" />
              <ToggleBtn active={correct === false} onClick={() => setCorrect(false)}
                label="Incorrect" icon="❌" activeColor="#dc2626" activeBg="#fef2f2" activeBorder="#fecaca" />
            </div>
          </div>

          {/* Summary */}
          {canSubmit && (
            <div style={{
              background: correct ? "#f0fdf4" : "#fef2f2",
              border: `1px solid ${correct ? "#bbf7d0" : "#fecaca"}`,
              borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 24 }}>{correct ? "🏅" : "💨"}</span>
              <div>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 13, color: correct ? "#16a34a" : "#dc2626", fontWeight: 700 }}>
                  {interrupted ? "Interrupted" : "Full question"} · {correct ? "Correct" : "Incorrect"}
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>
                  {correct
                    ? `+${question.points} points awarded to ${quizzer}`
                    : `−${deduction} points deducted from ${quizzer} and team`}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onCancel} style={{ flex: 1, padding: "12px", borderRadius: 10, cursor: "pointer", background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151", fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: "0.05em" }}>Cancel</button>
            <button onClick={submit} disabled={!canSubmit} style={{
              flex: 2, padding: "12px", borderRadius: 10,
              cursor: canSubmit ? "pointer" : "not-allowed",
              background: canSubmit ? "linear-gradient(135deg,#1d4ed8,#3b82f6)" : "#f3f4f6",
              border: canSubmit ? "none" : "1px solid #e5e7eb",
              color: canSubmit ? "#fff" : "#9ca3af",
              fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em",
              boxShadow: canSubmit ? "0 4px 16px rgba(59,130,246,0.3)" : "none",
            }}>Confirm Ruling</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SubstitutionWindow ────────────────────────────────────────────────────────
function SubstitutionWindow({ quizzer, team, reason, subs, onSwap, onDismiss }) {
  const isRed   = team === "red";
  const accent  = isRed ? "#dc2626" : "#16a34a";
  const bg      = isRed ? "#fef2f2"  : "#f0fdf4";
  const border  = isRed ? "#fecaca"  : "#bbf7d0";
  const emoji   = isRed ? "🔴" : "🟢";

  const quizzedOutLabel = reason === "correct" ? "Quizzed Out Forward" : reason === "incorrect" ? "Quizzed Out Backward" : "Eliminated — 3 Fouls";
  const quizzedOutDesc  = reason === "correct"
    ? `${quizzer} has answered 6 questions correctly (+20 pts bonus awarded)`
    : reason === "incorrect"
    ? `${quizzer} has answered 3 questions incorrectly`
    : `${quizzer} has accumulated 3 fouls and is eliminated`;
  const reasonColor = reason === "correct" ? "#16a34a" : reason === "incorrect" ? "#dc2626" : "#dc2626";
  const reasonIcon  = reason === "correct" ? "🏅" : reason === "incorrect" ? "⚠️" : "🚫";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 5000,
      background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Inter,system-ui,sans-serif", color: "#1c1410",
      padding: "24px",
    }}>
      <div style={{
        background: "#fffefb", border: `2px solid ${border}`,
        borderRadius: 20, width: "100%", maxWidth: 480,
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ background: bg, borderBottom: `1px solid ${border}`, padding: "18px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>{reasonIcon}</span>
            <div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 15, fontWeight: 700, color: accent, letterSpacing: "0.06em" }}>
                {emoji} {quizzedOutLabel}
              </div>
              <div style={{ fontSize: 13, color: reasonColor, marginTop: 3 }}>{quizzedOutDesc}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Quizzer being replaced */}
          <div style={{ background: "#f7f3ee", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ fontSize: 10, color: "#6b7280", fontFamily: "'Cinzel',serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Player Being Substituted</div>
            <div style={{ fontSize: 17, color: "#1c1410", fontWeight: 600 }}>{quizzer}</div>
          </div>

          {/* Sub selection */}
          {subs.length > 0 ? (
            <div>
              <div style={{ fontSize: 10, color: accent, fontFamily: "'Cinzel',serif", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Select Substitute to Enter</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {subs.map((sub, i) => (
                  <button key={sub.id} onClick={() => onSwap(sub)} style={{
                    padding: "12px 16px", borderRadius: 10, cursor: "pointer", textAlign: "left",
                    background: bg, border: `1px solid ${border}`,
                    color: accent, fontFamily: "'Cinzel',serif", fontSize: 13,
                    display: "flex", alignItems: "center", gap: 10, transition: "all .15s",
                  }}>
                    <span style={{
                      width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                      background: "#fffefb", border: `1px solid ${border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700,
                    }}>S{i + 1}</span>
                    <span>{sub.name}</span>
                    <span style={{ marginLeft: "auto", fontSize: 11, color: "#9ca3af", fontStyle: "italic" }}>Sub {i + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ background: "#f7f3ee", border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px", textAlign: "center", color: "#9ca3af", fontStyle: "italic", fontSize: 14 }}>
              No substitutes available for this team.
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onDismiss} style={{
              flex: 1, padding: "12px", borderRadius: 10, cursor: "pointer",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)",
              color: "#c8a060", fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: "0.05em",
            }}>Keep {quizzer} In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── RoundQuizzingWindow ───────────────────────────────────────────────────────
function RoundQuizzingWindow({ questions, redQuizzers, greenQuizzers, onClose }) {
  // Split starters (1-4) from subs (5-8)
  const [redRoster,    setRedRoster]    = useState({ starters: redQuizzers.slice(0,4),   subs: redQuizzers.slice(4)   });
  const [greenRoster,  setGreenRoster]  = useState({ starters: greenQuizzers.slice(0,4), subs: greenQuizzers.slice(4) });
  const [current,      setCurrent]      = useState(0);
  const [finished,     setFinished]     = useState(false);
  const [ruling,       setRuling]       = useState(null);
  const [log,          setLog]          = useState([]);
  const [scores,       setScores]       = useState({ red: 0, green: 0 });
  const [quizzerScores,setQuizzerScores]= useState({});
  const [quizzerRecord,setQuizzerRecord]= useState({});
  const [lockedTeam,   setLockedTeam]   = useState(null);
  const [rereadMode,   setRereadMode]   = useState(false);
  const [subPending,   setSubPending]   = useState(null);   // { quizzer, team, reason }
  const [subQueue,     setSubQueue]     = useState([]);        // array of pending { quizzer, team, reason }
  const [subTriggered, setSubTriggered] = useState({});         // names already prompted
  const [reportTab,    setReportTab]    = useState("summary"); // for finished screen tabs
  // ── Undo history ──
  const [history,      setHistory]      = useState([]); // stack of up to 20 snapshots

  const makeSnapshot = (overrides = {}) => ({
    redRoster: JSON.parse(JSON.stringify(overrides.redRoster ?? redRoster)),
    greenRoster: JSON.parse(JSON.stringify(overrides.greenRoster ?? greenRoster)),
    current: overrides.current ?? current,
    finished: overrides.finished ?? finished,
    log: overrides.log ?? [...log],
    scores: {...(overrides.scores ?? scores)},
    quizzerScores: {...(overrides.quizzerScores ?? quizzerScores)},
    quizzerRecord: JSON.parse(JSON.stringify(overrides.quizzerRecord ?? quizzerRecord)),
    lockedTeam: overrides.lockedTeam ?? lockedTeam,
    rereadMode: overrides.rereadMode ?? rereadMode,
    subPending: overrides.subPending !== undefined ? overrides.subPending : (subPending ? {...subPending} : null),
    subQueue: [...(overrides.subQueue ?? subQueue)],
    subTriggered: {...(overrides.subTriggered ?? subTriggered)},
    fouls: {...(overrides.fouls ?? fouls)},
    timeouts: {...(overrides.timeouts ?? timeouts)},
    quizzerFouls: {...(overrides.quizzerFouls ?? quizzerFouls)},
  });

  const saveSnapshot = () => setHistory(h => [...h.slice(-19), makeSnapshot()]);

  const undo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setRedRoster(prev.redRoster);
    setGreenRoster(prev.greenRoster);
    setCurrent(prev.current);
    setFinished(prev.finished);
    setLog(prev.log);
    setScores(prev.scores);
    setQuizzerScores(prev.quizzerScores);
    setQuizzerRecord(prev.quizzerRecord);
    setLockedTeam(prev.lockedTeam);
    setRereadMode(prev.rereadMode);
    setSubPending(prev.subPending);
    setSubQueue(prev.subQueue);
    setSubTriggered(prev.subTriggered);
    setFouls(prev.fouls);
    setTimeouts(prev.timeouts);
    setQuizzerFouls(prev.quizzerFouls);
    setRuling(null);
  };

  const [allQuestions,  setAllQuestions]  = useState(questions);
  const [isTiebreaker,  setIsTiebreaker]  = useState(false);

  const q   = allQuestions[current] || allQuestions[allQuestions.length - 1];
  const cfg = CR_RANGES[q.points];

  // Check ALL current starters on both teams for sub eligibility after a question resolves
  const collectEligibleSubs = (newQR, currentSubTriggered) => {
    const pending = [];
    const newTriggered = { ...currentSubTriggered };
    [
      { roster: redRoster,   team: "red"   },
      { roster: greenRoster, team: "green" },
    ].forEach(({ roster, team }) => {
      roster.starters.forEach(starter => {
        if (newTriggered[starter.name]) return;
        const rec = newQR[starter.name] || { correct: 0, incorrect: 0 };
        if (rec.correct >= 6 || rec.incorrect >= 3) {
          const reason = rec.correct >= 6 ? "correct" : "incorrect";
          if (reason === "correct") {
            setScores(s => ({ ...s, [team]: s[team] + 20 }));
            setQuizzerScores(qs => ({ ...qs, [starter.name]: (qs[starter.name] || 0) + 20 }));
          }
          pending.push({ quizzer: starter.name, team, reason });
          newTriggered[starter.name] = true;
        }
      });
    });
    return { pending, newTriggered };
  };

  const advanceQuestion = (pendingSubs = []) => {
    setLockedTeam(null);
    setRereadMode(false);
    if (pendingSubs.length > 0) {
      setSubQueue(pendingSubs);
      setSubPending(pendingSubs[0]);
    }
    const isLast = current >= allQuestions.length - 1;
    if (!isLast) {
      setCurrent(c => c + 1);
    } else if (!isTiebreaker && scores.red === scores.green) {
      // Tied at end — append 3 fresh 10pt tiebreaker questions
      const used = new Set(allQuestions.map(aq => aq.number));
      const tbPool = ALL_QUESTIONS.filter(aq => aq.points === 10 && aq.question && !used.has(aq.number));
      const tbQs   = pickRandom(tbPool, Math.min(3, tbPool.length));
      if (tbQs.length > 0) {
        setIsTiebreaker(true);
        setAllQuestions(prev => [...prev, ...tbQs]);
        setCurrent(c => c + 1);
      } else {
        setFinished(true);
      }
    } else {
      setFinished(true);
    }
  };

  const handleSelectQuizzer = (qz) => {
    if (lockedTeam && qz.team === lockedTeam) return;
    const fc = quizzerFouls[qz.name] || 0;
    if (fc >= 3) return; // eliminated
    setRuling({ quizzer: qz.name, team: qz.team });
  };

  const handleRuling = (result) => {
    saveSnapshot();
    const entry = { questionIndex: current, question: q, reread: rereadMode, ...result };
    setLog(l => [...l, entry]);

    const newQS = { ...quizzerScores };
    const newQR = { ...quizzerRecord };

    // Update scores/records for the quizzer
    if (result.correct) {
      setScores(s => ({ ...s, [result.team]: s[result.team] + q.points }));
      newQS[result.quizzer] = (newQS[result.quizzer] || 0) + q.points;
      const prev = newQR[result.quizzer] || { correct: 0, incorrect: 0 };
      newQR[result.quizzer] = { ...prev, correct: prev.correct + 1 };
    } else {
      const deduction = result.deduction || 0;
      if (deduction > 0) {
        setScores(s => ({ ...s, [result.team]: s[result.team] - deduction }));
        newQS[result.quizzer] = (newQS[result.quizzer] || 0) - deduction;
      }
      const prev = newQR[result.quizzer] || { correct: 0, incorrect: 0 };
      newQR[result.quizzer] = { ...prev, incorrect: prev.incorrect + 1 };
    }

    setQuizzerScores(newQS);
    setQuizzerRecord(newQR);

    const isFullResolution = result.correct || !result.interrupted || rereadMode;

    if (!isFullResolution) {
      // Interrupted + wrong on first read — re-read to other team, don't advance yet
      setLockedTeam(result.team);
      setRereadMode(true);
      setRuling(null);
    } else {
      // Full resolution: check ALL starters on BOTH teams for sub eligibility
      const { pending, newTriggered } = collectEligibleSubs(newQR, subTriggered);
      setSubTriggered(newTriggered);
      // Merge with anything queued from the interrupted half
      const allPending = [...subQueue, ...pending];
      setSubQueue([]);
      setRuling(null);
      advanceQuestion(allPending);
    }
  };

  const handleNoResponse = () => {
    saveSnapshot();
    setLog(l => [...l, { questionIndex: current, question: q, reread: rereadMode, noResponse: true }]);
    if (rereadMode) {
      // Reread ended with no response — full resolution
      const { pending, newTriggered } = collectEligibleSubs(quizzerRecord, subTriggered);
      setSubTriggered(newTriggered);
      const allPending = [...subQueue, ...pending];
      setSubQueue([]);
      advanceQuestion(allPending);
    } else {
      // Normal no response — full resolution
      const { pending, newTriggered } = collectEligibleSubs(quizzerRecord, subTriggered);
      setSubTriggered(newTriggered);
      advanceQuestion(pending);
    }
  };

  const handleSwap = (sub) => {
    const { quizzer, team } = subPending;
    const setRoster = team === "red" ? setRedRoster : setGreenRoster;
    setRoster(r => {
      const swappedOut = r.starters.find(s => s.name === quizzer);
      const newStarters = r.starters.map(s => s.name === quizzer ? sub : s);
      const newSubs = r.subs.filter(s => s.id !== sub.id);
      return { starters: newStarters, subs: swappedOut ? [...newSubs, swappedOut] : newSubs };
    });
    // Move to next in queue
    const remaining = subQueue.filter((_, i) => i > 0);
    setSubQueue(remaining);
    setSubPending(remaining.length > 0 ? remaining[0] : null);
  };

  const handleDismissSub = () => {
    const remaining = subQueue.filter((_, i) => i > 0);
    setSubQueue(remaining);
    setSubPending(remaining.length > 0 ? remaining[0] : null);
  };

  // ── Timer ──
  const [elapsed,      setElapsed]      = useState(0);          // seconds since match started
  const [timeoutActive,setTimeoutActive]= useState(false);      // 30-sec timeout running
  const [timeoutLeft,  setTimeoutLeft]  = useState(30);
  const [timeouts,     setTimeouts]     = useState({ red: 0, green: 0 });
  const [fouls,        setFouls]        = useState({ red: 0, green: 0 });
  const [quizzerFouls, setQuizzerFouls] = useState({});

  // Main match clock
  useEffect(() => {
    if (finished) return;
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, [finished]);

  // Timeout countdown
  useEffect(() => {
    if (!timeoutActive) return;
    if (timeoutLeft <= 0) {
      setTimeoutActive(false);
      setTimeoutLeft(30);
      // Beep
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        [0, 0.15, 0.3].forEach(offset => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 880;
          gain.gain.setValueAtTime(0.4, ctx.currentTime + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.12);
          osc.start(ctx.currentTime + offset);
          osc.stop(ctx.currentTime + offset + 0.12);
        });
      } catch(e) {}
      return;
    }
    const id = setInterval(() => setTimeoutLeft(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeoutActive, timeoutLeft]);

  const fmtTime = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const callTimeout = (team) => {
    saveSnapshot();
    if (timeoutActive) return;
    if (timeouts[team] >= 3) {
      // 4th timeout = foul
      setFouls(f => ({ ...f, [team]: f[team] + 1 }));
      setScores(s => ({ ...s, [team]: s[team] - 5 }));
      return;
    }
    setTimeouts(t => ({ ...t, [team]: t[team] + 1 }));
    setTimeoutActive(true);
    setTimeoutLeft(30);
  };

  const callFoul = (team) => {
    saveSnapshot();
    setFouls(f => ({ ...f, [team]: f[team] + 1 }));
    setScores(s => ({ ...s, [team]: s[team] - 5 }));
  };

  const callQuizzerFoul = (qzName, team) => {
    saveSnapshot();
    const newFoulCount = (quizzerFouls[qzName] || 0) + 1;
    setQuizzerFouls(qf => ({ ...qf, [qzName]: newFoulCount }));
    setFouls(f => ({ ...f, [team]: f[team] + 1 }));
    setScores(s => ({ ...s, [team]: s[team] - 5 }));
    setQuizzerScores(qs => ({ ...qs, [qzName]: (qs[qzName] || 0) - 5 }));
    // 3 fouls = eliminated — trigger substitution window
    if (newFoulCount >= 3 && !subTriggered[qzName]) {
      const roster = team === "red" ? redRoster : greenRoster;
      if (roster.starters.some(s => s.name === qzName)) {
        setSubTriggered(t => ({ ...t, [qzName]: true }));
        setSubPending({ quizzer: qzName, team, reason: "eliminated" });
      }
    }
  };

  const progress = ((current) / allQuestions.length) * 100;
  const RED_C   = { accent: "#f87171", bg: "rgba(248,113,113,0.10)", border: "rgba(248,113,113,0.30)" };
  const GREEN_C = { accent: "#4ade80", bg: "rgba(74,222,128,0.10)",  border: "rgba(74,222,128,0.30)" };
  const teamCfg = (team) => team === "red" ? RED_C : GREEN_C;
  const otherTeam = (team) => team === "red" ? "green" : "red";

  if (finished) {
    const winner = scores.red > scores.green ? "red" : scores.green > scores.red ? "green" : "tie";
    const matchDate = new Date().toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" });
    const matchTime = new Date().toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit" });

    // Build per-quizzer detailed stats from the log
    const allQuizzers = [
      ...redQuizzers.map(q => ({ ...q, team: "red" })),
      ...greenQuizzers.map(q => ({ ...q, team: "green" })),
    ];

    const buildStats = (name) => {
      const entries = log.filter(e => e.quizzer === name && !e.noResponse);
      const stats = {
        10: { interrupted: { correct:0, incorrect:0 }, notInterrupted: { correct:0, incorrect:0 } },
        20: { interrupted: { correct:0, incorrect:0 }, notInterrupted: { correct:0, incorrect:0 } },
        30: { interrupted: { correct:0, incorrect:0 }, notInterrupted: { correct:0, incorrect:0 } },
      };
      entries.forEach(e => {
        const pts = e.question?.points;
        if (!pts || !stats[pts]) return;
        const bucket = e.interrupted ? "interrupted" : "notInterrupted";
        if (e.correct) stats[pts][bucket].correct++;
        else           stats[pts][bucket].incorrect++;
      });
      return stats;
    };

    // Generate plain-text report
    const buildReportText = () => {
      const winner = scores.red > scores.green ? "Red Team" : scores.green > scores.red ? "Green Team" : "Tie";
      let txt = `JBQ MATCH REPORT\n`;
      txt += `Date: ${matchDate} at ${matchTime}\n`;
      txt += `Result: ${winner === "Tie" ? "Tie" : winner + " wins!"}\n`;
      txt += `Red Team: ${scores.red} pts   Green Team: ${scores.green} pts\n`;
      txt += `Duration: ${fmtTime(elapsed)}\n\n`;
      txt += `${"=".repeat(60)}\n`;
      txt += `QUIZZER BREAKDOWN\n`;
      txt += `${"=".repeat(60)}\n\n`;
      allQuizzers.forEach(qz => {
        const s = buildStats(qz.name);
        const total = quizzerScores[qz.name] || 0;
        const rec = quizzerRecord[qz.name] || { correct:0, incorrect:0 };
        const fc = quizzerFouls[qz.name] || 0;
        txt += `${qz.name} (${qz.team === "red" ? "Red" : "Green"} Team)\n`;
        txt += `  Total Points: ${total >= 0 ? "+"+total : total}  |  Correct: ${rec.correct}  Incorrect: ${rec.incorrect}  Fouls: ${fc}\n`;
        [10, 20, 30].forEach(pts => {
          const cat = s[pts];
          const anyActivity = cat.interrupted.correct + cat.interrupted.incorrect + cat.notInterrupted.correct + cat.notInterrupted.incorrect > 0;
          if (!anyActivity) return;
          txt += `  ${pts}-Point Questions:\n`;
          if (cat.interrupted.correct + cat.interrupted.incorrect > 0)
            txt += `    Interrupted:     ✓ ${cat.interrupted.correct}  ✗ ${cat.interrupted.incorrect}\n`;
          if (cat.notInterrupted.correct + cat.notInterrupted.incorrect > 0)
            txt += `    Not Interrupted: ✓ ${cat.notInterrupted.correct}  ✗ ${cat.notInterrupted.incorrect}\n`;
        });
        txt += `\n`;
      });
      txt += `${"=".repeat(60)}\n`;
      txt += `QUESTION LOG\n`;
      txt += `${"=".repeat(60)}\n`;
      log.forEach((e, i) => {
        if (e.noResponse) {
          txt += `${i+1}. Q${e.question?.number} (${e.question?.points}pts) — No Response\n`;
        } else {
          const flags = [e.reread ? "re-read" : null, e.interrupted ? "interrupted" : null].filter(Boolean).join(", ");
          txt += `${i+1}. Q${e.question?.number} (${e.question?.points}pts) — ${e.quizzer} [${e.team}] — ${e.correct ? "Correct +"+e.question?.points : "Incorrect −"+(e.deduction||0)}${flags ? " ("+flags+")" : ""}\n`;
        }
      });
      return txt;
    };

    const downloadReport = () => {
      const txt = buildReportText();
      const blob = new Blob([txt], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `JBQ-Match-Report-${matchDate.replace(/\s/g,"-")}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    };

    const emailReport = () => {
      const txt = buildReportText();
      const subject = encodeURIComponent(`JBQ Match Report — ${matchDate}`);
      const body = encodeURIComponent(txt);
      window.open(`mailto:?subject=${subject}&body=${body}`);
    };

    const PT_COLORS = { 10: "#60a5fa", 20: "#fbbf24", 30: "#f87171" };

    return (
      <div style={{ flex:1, display:"flex", flexDirection:"column", background:"#faf7f2", overflowY:"auto", fontFamily:"Inter,system-ui,sans-serif", color:"#1c1410" }}>

        {/* Header */}
        <div style={{ background:"#fffefb", borderBottom:"1px solid #fde68a", padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, flexWrap:"wrap", gap:10 }}>
          <div>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:20, fontWeight:700, color:"#c26a14" }}>
              {winner === "tie" ? "🤝 It's a Tie!" : winner === "red" ? "🏆 Red Team Wins!" : "🏆 Green Team Wins!"}
            </div>
            <div style={{ fontSize:12, color:"#7a6f64", marginTop:2 }}>{matchDate} · {matchTime} · {fmtTime(elapsed)} match time{isTiebreaker ? " · Tiebreaker played" : ""}</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={downloadReport} style={{ padding:"9px 18px", borderRadius:8, cursor:"pointer", background:"#d5eaff", border:"1px solid rgba(96,165,250,0.3)", color:"#2563eb", fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:"0.05em" }}>⬇ Download</button>
            <button onClick={emailReport}    style={{ padding:"9px 18px", borderRadius:8, cursor:"pointer", background:"#fdf6e8", border:"1px solid #fcd34d", color:"#c26a14",  fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:"0.05em" }}>✉ Email</button>
            <button onClick={onClose}        style={{ padding:"9px 18px", borderRadius:8, cursor:"pointer", background:"#f0ebe3", border:"1px solid #d4c9bc", color:"#4a3f35", fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:"0.05em" }}>✕ Close</button>
          </div>
        </div>

        {/* Score banner */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", background:"#f0ebe3", borderBottom:"1px solid #e2d9cf", padding:"16px 28px", gap:0 }}>
          <div>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:11, color:"#dc2626", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>🔴 Red Team</div>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:36, fontWeight:700, color:"#dc2626", lineHeight:1 }}>{scores.red}</div>
            <div style={{ fontSize:13, fontWeight:600, color:"#dc2626", marginTop:4 }}>⚠ {fouls.red} foul{fouls.red!==1?"s":""} · ⏸ {timeouts.red}/3 TOs</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", padding:"0 24px", fontFamily:"'Cinzel',serif", fontSize:13, color:"#a89c92" }}>VS</div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:11, color:"#16a34a", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>🟢 Green Team</div>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:36, fontWeight:700, color:"#16a34a", lineHeight:1 }}>{scores.green}</div>
            <div style={{ fontSize:13, fontWeight:600, color:"#4a3f35", marginTop:4 }}>⏸ {timeouts.green}/3 TOs · ⚠ {fouls.green} foul{fouls.green!==1?"s":""}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", borderBottom:"1px solid #e2d9cf", background:"#f7f3ee", flexShrink:0 }}>
          {[["summary","📊 Summary"],["quizzers","👤 Quizzers"],["log","📋 Log"]].map(([id,label]) => (
            <button key={id} onClick={() => setReportTab(id)} style={{ padding:"11px 22px", border:"none", background:"transparent", cursor:"pointer", fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:"0.06em", color: reportTab===id ? "#f0a500" : "#7a6040", borderBottom: reportTab===id ? "2px solid #f0a500" : "2px solid transparent", transition:"all .15s" }}>{label}</button>
          ))}
        </div>

        {/* Tab: Summary */}
        {reportTab === "summary" && (
          <div style={{ flex:1, padding:"24px 28px", overflowY:"auto", maxWidth:860, width:"100%" }}>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:11, color:"#9a4a10", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:16 }}>Team Overview</div>
            <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:28 }}>
              {[{ team:"red", tc:RED_C, label:"Red Team", qzs: redQuizzers }, { team:"green", tc:GREEN_C, label:"Green Team", qzs: greenQuizzers }].map(({ team, tc, label, qzs }) => (
                <div key={team} style={{ flex:1, minWidth:240, background:tc.bg, border:`1px solid ${tc.border}`, borderRadius:12, padding:"16px 18px" }}>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:11, color:tc.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>{label}</div>
                  {qzs.map(qz => {
                    const s = buildStats(qz.name);
                    const total = quizzerScores[qz.name] || 0;
                    const rec = quizzerRecord[qz.name] || { correct:0, incorrect:0 };
                    const fc = quizzerFouls[qz.name] || 0;
                    const hasActivity = log.some(e => e.quizzer === qz.name);
                    return (
                      <div key={qz.id} style={{ marginBottom:10, paddingBottom:10, borderBottom:`1px solid ${tc.border}` }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                          <span style={{ fontSize:14, color:"#1c1410" }}>{qz.name}</span>
                          <span style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, color: total >= 0 ? tc.accent : "#f87171" }}>{total >= 0 ? "+" : ""}{total}</span>
                        </div>
                        {hasActivity ? (
                          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                            {[10,20,30].map(pts => {
                              const cat = s[pts];
                              const tot = cat.interrupted.correct + cat.interrupted.incorrect + cat.notInterrupted.correct + cat.notInterrupted.incorrect;
                              if (!tot) return null;
                              return (
                                <div key={pts} style={{ background:"#f0ebe3", border:`1px solid ${PT_COLORS[pts]}33`, borderRadius:7, padding:"5px 9px" }}>
                                  <div style={{ fontSize:12, fontWeight:700, color:PT_COLORS[pts], fontFamily:"'Cinzel',serif", letterSpacing:"0.08em", marginBottom:3 }}>{pts}PT</div>
                                  {cat.interrupted.correct + cat.interrupted.incorrect > 0 && (
                                    <div style={{ fontSize:13, color:"#4a3f35" }}>✋ ✓{cat.interrupted.correct} ✗{cat.interrupted.incorrect}</div>
                                  )}
                                  {cat.notInterrupted.correct + cat.notInterrupted.incorrect > 0 && (
                                    <div style={{ fontSize:13, color:"#4a3f35" }}>📖 ✓{cat.notInterrupted.correct} ✗{cat.notInterrupted.incorrect}</div>
                                  )}
                                </div>
                              );
                            })}
                            {fc > 0 && <div style={{ background:"rgba(251,191,36,0.1)", border:"1px solid #fcd34d", borderRadius:7, padding:"5px 9px", fontSize:10, color:"#9a4a10" }}>⚠ {fc} foul{fc!==1?"s":""}</div>}
                          </div>
                        ) : (
                          <div style={{ fontSize:13, color:"#7a6f64", fontStyle:"italic" }}>No questions answered</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Quizzers — full per-quizzer breakdown */}
        {reportTab === "quizzers" && (
          <div style={{ flex:1, padding:"24px 28px", overflowY:"auto", maxWidth:860, width:"100%" }}>
            {allQuizzers.map(qz => {
              const s = buildStats(qz.name);
              const total = quizzerScores[qz.name] || 0;
              const rec = quizzerRecord[qz.name] || { correct:0, incorrect:0 };
              const fc = quizzerFouls[qz.name] || 0;
              const tc = qz.team === "red" ? RED_C : GREEN_C;
              return (
                <div key={qz.id} style={{ background:"#f7f3ee", border:`1px solid ${tc.border}`, borderRadius:12, padding:"18px 20px", marginBottom:14 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color: qz.team==="red" ? "#dc2626" : "#16a34a" }}>{qz.name}</div>
                      <div style={{ fontSize:12, color:"#7a6f64", marginTop:1 }}>{qz.team === "red" ? "🔴 Red Team" : "🟢 Green Team"}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontFamily:"'Cinzel',serif", fontSize:22, fontWeight:700, color: total>=0 ? (qz.team==="red" ? "#f87171" : "#4ade80") : "#f87171" }}>{total>=0?"+":""}{total}</div>
                      <div style={{ fontSize:13, color:"#4a3f35" }}>✓{rec.correct} ✗{rec.incorrect}{fc>0?` ⚠${fc}`:""}</div>
                    </div>
                  </div>
                  <div className="report-quizzer-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                    {[10,20,30].map(pts => {
                      const cat = s[pts];
                      const intTotal = cat.interrupted.correct + cat.interrupted.incorrect;
                      const notTotal = cat.notInterrupted.correct + cat.notInterrupted.incorrect;
                      return (
                        <div key={pts} style={{ background:"#f0ebe3", border:`1px solid ${PT_COLORS[pts]}33`, borderRadius:9, padding:"12px 14px" }}>
                          <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, fontWeight:700, color:PT_COLORS[pts], letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>{pts}-Point</div>
                          <div style={{ marginBottom:6 }}>
                            <div style={{ fontSize:12, fontWeight:600, color:"#4a3f35", marginBottom:4 }}>✋ Interrupted ({intTotal})</div>
                            <div style={{ display:"flex", gap:8 }}>
                              <span style={{ fontSize:13, color:"#16a34a", fontFamily:"'Cinzel',serif" }}>✓ {cat.interrupted.correct}</span>
                              <span style={{ fontSize:13, color:"#dc2626", fontFamily:"'Cinzel',serif" }}>✗ {cat.interrupted.incorrect}</span>
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize:12, fontWeight:600, color:"#4a3f35", marginBottom:4 }}>📖 Not Interrupted ({notTotal})</div>
                            <div style={{ display:"flex", gap:8 }}>
                              <span style={{ fontSize:13, color:"#16a34a", fontFamily:"'Cinzel',serif" }}>✓ {cat.notInterrupted.correct}</span>
                              <span style={{ fontSize:13, color:"#dc2626", fontFamily:"'Cinzel',serif" }}>✗ {cat.notInterrupted.incorrect}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab: Log */}
        {reportTab === "log" && (
          <div style={{ flex:1, padding:"24px 28px", overflowY:"auto", maxWidth:860, width:"100%" }}>
            <div style={{ background:"#f7f3ee", border:"1px solid #e2d9cf", borderRadius:12, overflow:"hidden" }}>
              {log.map((entry, i) => {
                const ec = CR_RANGES[entry.question.points];
                return (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 18px", borderBottom:"1px solid rgba(255,255,255,0.04)", background: i%2===0 ? "#fffefb" : "#f7f3ee" }}>
                    <div style={{ width:30, height:30, borderRadius:7, background:`linear-gradient(135deg,${ec.badge},${ec.color})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cinzel',serif", fontSize:11, color:"#fff", fontWeight:700, flexShrink:0 }}>{i+1}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, color:"#7a6f64" }}>{entry.question.question.slice(0,70)}{entry.question.question.length>70?"…":""}</div>
                      <div style={{ fontSize:12, color:"#7a6f64", marginTop:2 }}>Q{entry.question.number} · {entry.question.points}pts{entry.question.reference ? " · "+entry.question.reference : ""}</div>
                    </div>
                    {entry.noResponse ? (
                      <span style={{ fontSize:12, color:"#a89c92", fontStyle:"italic", flexShrink:0 }}>no response</span>
                    ) : (
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:2, flexShrink:0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          {entry.reread && <span style={{ fontSize:11, fontWeight:700, color:"#9a4a10", fontFamily:"'Cinzel',serif", background:"#fef3d8", padding:"2px 7px", borderRadius:4 }}>RE-READ</span>}
                          {entry.interrupted && <span style={{ fontSize:11 }}>✋</span>}
                          <span style={{ fontSize:12, color: entry.team==="red" ? "#dc2626" : "#16a34a", fontFamily:"'Cinzel',serif" }}>{entry.quizzer}</span>
                        </div>
                        <span style={{ fontSize:12, fontFamily:"'Cinzel',serif", fontWeight:700, color: entry.correct ? "#4ade80" : "#f87171" }}>
                          {entry.correct ? `+${entry.question.points}` : entry.deduction > 0 ? `−${entry.deduction}` : "0"}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#faf7f2", overflowY: "auto" }}>

      {subPending && (
        <SubstitutionWindow
          quizzer={subPending.quizzer}
          team={subPending.team}
          reason={subPending.reason}
          subs={subPending.team === "red" ? redRoster.subs : greenRoster.subs}
          onSwap={handleSwap}
          onDismiss={handleDismissSub}
        />
      )}

      {ruling && (
        <QuestionRuling
          question={q}
          quizzer={ruling.quizzer}
          team={ruling.team}
          onRuling={handleRuling}
          onCancel={() => setRuling(null)}
        />
      )}

      {/* Timeout overlay */}
      {timeoutActive && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 4500,
          background: "rgba(0,0,0,0.85)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          fontFamily: "Inter,system-ui,sans-serif",
        }}>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 14, color: "#f0a500", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>⏸ Timeout</div>
          <div style={{
            fontFamily: "'Cinzel',serif", fontSize: 100, fontWeight: 700,
            color: timeoutLeft <= 5 ? "#dc2626" : "#111827",
            lineHeight: 1, transition: "color .3s",
          }}>{timeoutLeft}</div>
          <div style={{ fontSize: 14, color: "#7a6040", marginTop: 8 }}>seconds remaining</div>
          <button onClick={() => { setTimeoutActive(false); setTimeoutLeft(30); }} style={{
            marginTop: 28, padding: "10px 28px", borderRadius: 10, cursor: "pointer",
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#c8a060", fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: "0.06em",
          }}>End Timeout Early</button>
        </div>
      )}

      {/* ── TOP BAR: timer + progress ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px", background: "#fffefb", borderBottom: "1px solid #fde68a", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f0a500", display: "inline-block", animation: "pulse 1.5s infinite" }} />
          <span style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: "#c8860a", letterSpacing: "0.12em" }}>MATCH IN PROGRESS</span>
        </div>
        <span style={{ fontFamily: "'Cinzel',serif", fontSize: 22, fontWeight: 700, color: "#f0a500", letterSpacing: "0.06em", minWidth: 80, textAlign: "center" }}>{fmtTime(elapsed)}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: "#9a4a10" }}>Q {current + 1} / {allQuestions.length}{isTiebreaker ? " (TB)" : ""}</span>
          <div style={{ width: 80, height: 4, background: "#e2d9cf", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "#c26a14", borderRadius: 2, transition: "width .4s" }} />
          </div>
          <button onClick={undo} disabled={history.length === 0} title="Undo last action" style={{ marginLeft: 4, padding: "4px 10px", borderRadius: 7, cursor: history.length === 0 ? "not-allowed" : "pointer", background: history.length > 0 ? "#f0ebe3" : "#f7f3ee", border: `1px solid ${history.length > 0 ? "#d4c9bc" : "#e2d9cf"}`, color: history.length > 0 ? "#4a3f35" : "#a89c92", fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.04em" }}>
            ↩ Undo
          </button>
          <button onClick={() => setFinished(true)} title="End round early" style={{ padding: "4px 10px", borderRadius: 7, cursor: "pointer", background: "#fdf0f0", border: "1px solid #fecaca", color: "#dc2626", fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.04em" }}>
            End Round
          </button>
        </div>
      </div>

      {/* ── SCOREBOARD ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 0, background: "#fffefb", borderBottom: "1px solid #e2d9cf", flexShrink: 0 }}>
        {/* Red */}
        <div style={{ padding: "14px 20px", borderRight: "1px solid #e2d9cf" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, color: "#dc2626", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>Red Team</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 32, fontWeight: 700, color: "#dc2626", lineHeight: 1 }}>{scores.red}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 20, height: 20, borderRadius: 4, background: i < timeouts.red ? "#fef3c7" : "#f0ebe3", border: `1px solid ${i < timeouts.red ? "#fcd34d" : "#d4c9bc"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: i < timeouts.red ? "#d97706" : "#a89c92" }}>T</div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: fouls.red > 0 ? "#b45309" : "#a89c92", fontFamily: "'Cinzel',serif", textAlign: "center" }}>
                {fouls.red > 0 ? `⚠ ${fouls.red} foul${fouls.red !== 1 ? "s" : ""}` : "no fouls"}
              </div>
            </div>
          </div>
        </div>
        {/* VS */}
        <div className="match-vs" style={{ padding: "0 18px", fontFamily: "'Cinzel',serif", fontSize: 13, color: "#a89c92", letterSpacing: "0.1em" }}>VS</div>
        {/* Green */}
        <div style={{ padding: "14px 20px", borderLeft: "1px solid #e2d9cf" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 20, height: 20, borderRadius: 4, background: i < timeouts.green ? "#fef3c7" : "#f0ebe3", border: `1px solid ${i < timeouts.green ? "#fcd34d" : "#d4c9bc"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: i < timeouts.green ? "#d97706" : "#a89c92" }}>T</div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: fouls.green > 0 ? "#b45309" : "#a89c92", fontFamily: "'Cinzel',serif", textAlign: "center" }}>
                {fouls.green > 0 ? `⚠ ${fouls.green} foul${fouls.green !== 1 ? "s" : ""}` : "no fouls"}
              </div>
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, color: "#16a34a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>Green Team</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 32, fontWeight: 700, color: "#16a34a", lineHeight: 1 }}>{scores.green}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TIEBREAKER BANNER ── */}
      {isTiebreaker && (
        <div style={{ background: "#fef9c3", borderBottom: "2px solid #fcd34d", padding: "10px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <span style={{ fontSize: 20 }}>⚖️</span>
          <div>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700, color: "#b45309", letterSpacing: "0.05em" }}>Tiebreaker Round — 3 × 10-Point Questions</div>
            <div style={{ fontSize: 12, color: "#7a6f64", marginTop: 2 }}>Scores were tied at the end of regulation — first team to pull ahead wins</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: "#b45309" }}>🔴 {scores.red} — {scores.green} 🟢</div>
          </div>
        </div>
      )}

      {/* ── RE-READ BANNER ── */}
      {rereadMode && lockedTeam && (
        <div style={{ background: "#fffbeb", borderBottom: "2px solid #fcd34d", padding: "10px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🔄</div>
          <div>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700, color: "#b45309", letterSpacing: "0.05em" }}>
              Re-read — {otherTeam(lockedTeam) === "red" ? "🔴 Red" : "🟢 Green"} Team answers
            </div>
            <div style={{ fontSize: 12, color: "#7a6040", marginTop: 2 }}>
              {lockedTeam === "red" ? "🔴 Red" : "🟢 Green"} Team locked out for interrupting incorrectly
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN 3-COLUMN LAYOUT ── */}
      <div className="match-3col" style={{ flex: 1, display: "flex", overflow: "auto" }}>

        {/* LEFT — Red Team panel */}
        {(() => {
          const isLocked = lockedTeam === "red";
          return (
            <div className="match-team-left" style={{ width: 220, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", background: isLocked ? "rgba(0,0,0,0.2)" : "rgba(248,113,113,0.04)", overflow: "auto" }}>
              {/* Team header */}
              <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid rgba(248,113,113,0.15)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: isLocked ? "#3a2020" : "#f87171", letterSpacing: "0.1em", textTransform: "uppercase" }}>🔴 Red Team</span>
                  {isLocked && <span style={{ fontSize: 12, fontWeight:700, color: "#dc2626", background: "#fef2f2", padding: "3px 8px", borderRadius: 20, fontFamily: "'Cinzel',serif" }}>🔒 Locked</span>}
                </div>
                {/* Team controls */}
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => callFoul("red")} style={{ flex: 1, padding: "6px 4px", borderRadius: 7, cursor: "pointer", background: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.3)", color: "#dc2626", fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.03em" }}>
                    ⚠ Foul{fouls.red > 0 ? ` (${fouls.red})` : ""}
                  </button>
                  <button onClick={() => callTimeout("red")} disabled={timeoutActive} style={{ flex: 1, padding: "6px 4px", borderRadius: 7, cursor: timeoutActive ? "not-allowed" : "pointer", background: timeouts.red >= 3 ? "rgba(248,113,113,0.10)" : "rgba(251,191,36,0.12)", border: `1px solid ${timeouts.red >= 3 ? "rgba(248,113,113,0.3)" : "rgba(251,191,36,0.35)"}`, color: timeouts.red >= 3 ? "#f87171" : "#fbbf24", fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight:600, opacity: timeoutActive ? 0.5 : 1 }}>
                    ⏸ TO {timeouts.red}/3
                  </button>
                </div>
              </div>
              {/* Quizzers */}
              <div style={{ flex: 1, padding: "10px 10px", display: "flex", flexDirection: "column", gap: 7 }}>
                <div style={{ fontSize: 12, fontWeight:600, color: "#7a6f64", fontFamily: "'Cinzel',serif", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>
                  {rereadMode ? "Select who responded" : "Select who answered"}
                </div>
                {redRoster.starters.map((qz, i) => {
                  const pts = quizzerScores[qz.name] || 0;
                  const rec = quizzerRecord[qz.name] || { correct: 0, incorrect: 0 };
                  const fc  = quizzerFouls[qz.name] || 0;
                  const isEliminated = fc >= 3;
                  const isDisabled   = isLocked || isEliminated;
                  return (
                    <div key={qz.id} style={{ display: "flex", flexDirection: "column", gap: 3, background: isEliminated ? "#fef2f2" : isLocked ? "rgba(255,255,255,0.02)" : "rgba(248,113,113,0.07)", border: `1px solid ${isEliminated ? "#fca5a5" : isLocked ? "rgba(255,255,255,0.05)" : "rgba(248,113,113,0.2)"}`, borderRadius: 9, overflow: "hidden", opacity: isLocked && !isEliminated ? 0.4 : 1 }}>
                      <button disabled={isDisabled} onClick={() => handleSelectQuizzer({ ...qz, team: "red" })} style={{ padding: "9px 10px", background: "transparent", border: "none", cursor: isDisabled ? "not-allowed" : "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 20, height: 20, borderRadius: 4, background: isEliminated ? "#fecaca" : "rgba(248,113,113,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#dc2626", flexShrink: 0, fontFamily: "'Cinzel',serif" }}>R{i+1}</span>
                        <span style={{ flex: 1, fontSize: 12, color: isEliminated ? "#dc2626" : isLocked ? "#9ca3af" : "#1c1410", fontFamily: "'Cinzel',serif", textDecoration: isEliminated ? "line-through" : "none" }}>{qz.name}</span>
                        {isEliminated
                          ? <span style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", fontFamily: "'Cinzel',serif", background: "#fecaca", padding: "2px 7px", borderRadius: 20 }}>🚫 Out</span>
                          : <span style={{ fontSize: 13, fontFamily: "'Cinzel',serif", fontWeight: 700, color: pts < 0 ? "#dc2626" : "#1c1410" }}>{pts >= 0 ? "+" : ""}{pts}</span>
                        }
                      </button>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 10px 7px", borderTop: "1px solid rgba(248,113,113,0.1)" }}>
                        <span style={{ fontSize: 13, fontWeight:700, color: "#16a34a", fontFamily: "'Cinzel',serif" }}>✓{rec.correct}</span>
                        <span style={{ fontSize: 13, fontWeight:700, color: "#dc2626", fontFamily: "'Cinzel',serif" }}>✗{rec.incorrect}</span>
                        <span style={{ fontSize: 12, fontWeight:700, color: fc >= 2 ? "#dc2626" : "#b45309", fontFamily: "'Cinzel',serif" }}>⚠{fc}</span>
                        {!isEliminated && <button onClick={() => callQuizzerFoul(qz.name, "red")} style={{ marginLeft: "auto", padding: "3px 8px", borderRadius: 5, border: "1px solid #fecaca", background: "#fef2f2", color: "#dc2626", cursor: "pointer", fontSize: 11, fontFamily: "'Cinzel',serif", fontWeight: 600 }}>Foul</button>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* CENTER — Question + controls */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto", padding: "20px 20px" }}>

          {/* Question card */}
          <div style={{ background: cfg.bg, border: `2px solid ${cfg.border}`, borderRadius: 14, padding: "22px 24px", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: cfg.badge, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 14, color: "#fff", flexShrink: 0 }}>Q{q.number}</div>
              <div>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, color: cfg.color, letterSpacing: "0.12em", textTransform: "uppercase" }}>{q.points}-Point Question</div>
                <div style={{ fontSize: 11, color: "#a89c92", marginTop: 1 }}>Question {current + 1} of {allQuestions.length}{isTiebreaker ? " · Tiebreaker" : ""}</div>
              </div>
            </div>
            <p style={{ fontFamily: "Inter,system-ui,sans-serif", fontSize: 18, color: "#1c1410", lineHeight: 1.6, margin: "0 0 16px" }}>{q.question}</p>
            <div style={{ borderTop: `1px solid ${cfg.border}`, paddingTop: 14 }}>
              <div style={{ fontSize: 9, color: cfg.color, fontFamily: "'Cinzel',serif", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>Answer</div>
              <p style={{ margin: 0, fontFamily: "Inter,system-ui,sans-serif", fontSize: 16, color: "#166534", lineHeight: 1.6, whiteSpace: "pre-line" }}>{q.answer}</p>
              {q.reference && <p style={{ margin: "8px 0 0", fontSize: 12, color: "#8abecc", fontStyle: "italic" }}>📖 {q.reference}</p>}
            </div>
          </div>

          {/* No Response button */}
          <button onClick={handleNoResponse} style={{ width: "100%", padding: "12px", borderRadius: 10, cursor: "pointer", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "#5a4030", fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: "0.06em" }}>
            No Response — Skip Question →
          </button>
        </div>

        {/* RIGHT — Green Team panel */}
        {(() => {
          const isLocked = lockedTeam === "green";
          return (
            <div className="match-team-right" style={{ width: 220, flexShrink: 0, borderLeft: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", background: isLocked ? "rgba(0,0,0,0.2)" : "rgba(74,222,128,0.04)", overflow: "auto" }}>
              {/* Team header */}
              <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid rgba(74,222,128,0.15)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: isLocked ? "#1a3020" : "#4ade80", letterSpacing: "0.1em", textTransform: "uppercase" }}>🟢 Green Team</span>
                  {isLocked && <span style={{ fontSize: 12, fontWeight:700, color: "#16a34a", background: "#f0fdf4", padding: "3px 8px", borderRadius: 20, fontFamily: "'Cinzel',serif" }}>🔒 Locked</span>}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => callFoul("green")} style={{ flex: 1, padding: "6px 4px", borderRadius: 7, cursor: "pointer", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)", color: "#16a34a", fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.03em" }}>
                    ⚠ Foul{fouls.green > 0 ? ` (${fouls.green})` : ""}
                  </button>
                  <button onClick={() => callTimeout("green")} disabled={timeoutActive} style={{ flex: 1, padding: "6px 4px", borderRadius: 7, cursor: timeoutActive ? "not-allowed" : "pointer", background: timeouts.green >= 3 ? "rgba(248,113,113,0.10)" : "rgba(251,191,36,0.12)", border: `1px solid ${timeouts.green >= 3 ? "rgba(248,113,113,0.3)" : "rgba(251,191,36,0.35)"}`, color: timeouts.green >= 3 ? "#f87171" : "#fbbf24", fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight:600, opacity: timeoutActive ? 0.5 : 1 }}>
                    ⏸ TO {timeouts.green}/3
                  </button>
                </div>
              </div>
              {/* Quizzers */}
              <div style={{ flex: 1, padding: "10px 10px", display: "flex", flexDirection: "column", gap: 7 }}>
                <div style={{ fontSize: 12, fontWeight:600, color: "#7a6f64", fontFamily: "'Cinzel',serif", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>
                  {rereadMode ? "Select who responded" : "Select who answered"}
                </div>
                {greenRoster.starters.map((qz, i) => {
                  const pts = quizzerScores[qz.name] || 0;
                  const rec = quizzerRecord[qz.name] || { correct: 0, incorrect: 0 };
                  const fc  = quizzerFouls[qz.name] || 0;
                  const isEliminated = fc >= 3;
                  const isDisabled   = isLocked || isEliminated;
                  return (
                    <div key={qz.id} style={{ display: "flex", flexDirection: "column", gap: 3, background: isEliminated ? "#fef2f2" : isLocked ? "rgba(255,255,255,0.02)" : "rgba(74,222,128,0.06)", border: `1px solid ${isEliminated ? "#fca5a5" : isLocked ? "rgba(255,255,255,0.05)" : "rgba(74,222,128,0.18)"}`, borderRadius: 9, overflow: "hidden", opacity: isLocked && !isEliminated ? 0.4 : 1 }}>
                      <button disabled={isDisabled} onClick={() => handleSelectQuizzer({ ...qz, team: "green" })} style={{ padding: "9px 10px", background: "transparent", border: "none", cursor: isDisabled ? "not-allowed" : "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 20, height: 20, borderRadius: 4, background: isEliminated ? "#fecaca" : "rgba(74,222,128,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: isEliminated ? "#dc2626" : "#16a34a", flexShrink: 0, fontFamily: "'Cinzel',serif" }}>G{i+1}</span>
                        <span style={{ flex: 1, fontSize: 12, color: isEliminated ? "#dc2626" : isLocked ? "#9ca3af" : "#1c1410", fontFamily: "'Cinzel',serif", textDecoration: isEliminated ? "line-through" : "none" }}>{qz.name}</span>
                        {isEliminated
                          ? <span style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", fontFamily: "'Cinzel',serif", background: "#fecaca", padding: "2px 7px", borderRadius: 20 }}>🚫 Out</span>
                          : <span style={{ fontSize: 13, fontFamily: "'Cinzel',serif", fontWeight: 700, color: pts < 0 ? "#dc2626" : "#1c1410" }}>{pts >= 0 ? "+" : ""}{pts}</span>
                        }
                      </button>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 10px 7px", borderTop: "1px solid rgba(74,222,128,0.1)" }}>
                        <span style={{ fontSize: 13, fontWeight:700, color: "#16a34a", fontFamily: "'Cinzel',serif" }}>✓{rec.correct}</span>
                        <span style={{ fontSize: 13, fontWeight:700, color: "#dc2626", fontFamily: "'Cinzel',serif" }}>✗{rec.incorrect}</span>
                        <span style={{ fontSize: 12, fontWeight:700, color: fc >= 2 ? "#dc2626" : "#b45309", fontFamily: "'Cinzel',serif" }}>⚠{fc}</span>
                        {!isEliminated && <button onClick={() => callQuizzerFoul(qz.name, "green")} style={{ marginLeft: "auto", padding: "3px 8px", borderRadius: 5, border: "1px solid #bbf7d0", background: "#f0fdf4", color: "#16a34a", cursor: "pointer", fontSize: 11, fontFamily: "'Cinzel',serif", fontWeight: 600 }}>Foul</button>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}

// ── CreateRoundSet sub-component ─────────────────────────────────────────────

function CRRangeSlider({ pts, value, onChange }) {
  const cfg = CR_RANGES[pts];
  const total = cfg.max - cfg.min || 1;
  const lp = ((value[0] - cfg.min) / total) * 100;
  const rp = ((value[1] - cfg.min) / total) * 100;
  return (
    <div style={{ position: "relative", height: 44, userSelect: "none", marginBottom: 4 }}>
      <div style={{ position: "absolute", top: 16, left: 0, right: 0, height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3 }} />
      <div style={{ position: "absolute", top: 16, height: 6, borderRadius: 3, left: `${lp}%`, width: `${rp - lp}%`, background: `linear-gradient(90deg,${cfg.badge},${cfg.color})` }} />
      <input type="range" min={cfg.min} max={cfg.max} value={value[0]}
        onChange={e => onChange([Math.min(Number(e.target.value), value[1]), value[1]])}
        style={{ position: "absolute", width: "100%", top: 10, opacity: 0, cursor: "pointer", zIndex: value[0] > cfg.max - 5 ? 5 : 3, height: 24 }} />
      <input type="range" min={cfg.min} max={cfg.max} value={value[1]}
        onChange={e => onChange([value[0], Math.max(Number(e.target.value), value[0])])}
        style={{ position: "absolute", width: "100%", top: 10, opacity: 0, cursor: "pointer", zIndex: 4, height: 24 }} />
      {[lp, rp].map((pct, i) => (
        <div key={i} style={{ position: "absolute", top: 11, left: `${pct}%`, transform: "translateX(-50%)", width: 14, height: 14, borderRadius: "50%", background: `linear-gradient(135deg,${cfg.badge},${cfg.color})`, boxShadow: `0 0 0 3px rgba(0,0,0,0.5),0 0 0 5px ${cfg.border}`, pointerEvents: "none" }} />
      ))}
      {[{ pct: lp, v: value[0] }, { pct: rp, v: value[1] }].map(({ pct, v }, i) => (
        <div key={i} style={{ position: "absolute", top: 30, left: `${pct}%`, transform: "translateX(-50%)", fontSize: 10, color: cfg.color, fontFamily: "'Cinzel',serif", whiteSpace: "nowrap", pointerEvents: "none" }}>#{v}</div>
      ))}
    </div>
  );
}

function CreateRoundSet({ redQuizzers, greenQuizzers, onBack, onClose, onMatchStart, onMatchEnd }) {
  const initRanges = { 10: [CR_RANGES[10].min, CR_RANGES[10].max], 20: [CR_RANGES[20].min, CR_RANGES[20].max], 30: [CR_RANGES[30].min, CR_RANGES[30].max] };
  const [ranges, setRanges] = useState(initRanges);
  const [genError, setGenError] = useState("");
  const [questionSet, setQuestionSet] = useState(null);
  const [matchActive, setMatchActive] = useState(false);

  const setRange = (pts, val) => setRanges(r => ({ ...r, [pts]: val }));

  const pool = (pts) => ALL_QUESTIONS.filter(q => q.points === pts && q.number >= ranges[pts][0] && q.number <= ranges[pts][1] && q.question);
  const avail10 = pool(10).length, avail20 = pool(20).length, avail30 = pool(30).length;
  const canGenerate = avail10 >= 10 && avail20 >= 7 && avail30 >= 3;

  const generate = () => {
    setGenError("");
    const errs = [];
    if (avail10 < 10) errs.push(`Need 10 ten-point questions (only ${avail10} available in Q#${ranges[10][0]}–#${ranges[10][1]})`);
    if (avail20 < 7)  errs.push(`Need 7 twenty-point questions (only ${avail20} available in Q#${ranges[20][0]}–#${ranges[20][1]})`);
    if (avail30 < 3)  errs.push(`Need 3 thirty-point questions (only ${avail30} available in Q#${ranges[30][0]}–#${ranges[30][1]})`);
    if (errs.length) { setGenError(errs.join("\n")); return; }
    const set = shuffle([...pickRandom(pool(10), 10), ...pickRandom(pool(20), 7), ...pickRandom(pool(30), 3)]);
    setQuestionSet(set);
    setMatchActive(false);
  };

  const RED   = { accent: "#f87171", bg: "rgba(248,113,113,0.07)", border: "rgba(248,113,113,0.25)" };
  const GREEN = { accent: "#4ade80", bg: "rgba(74,222,128,0.07)",  border: "rgba(74,222,128,0.25)" };

  // ── Match window ──
  if (matchActive && questionSet) {
    return (
      <RoundQuizzingWindow
        questions={questionSet}
        redQuizzers={redQuizzers}
        greenQuizzers={greenQuizzers}
        onClose={() => { setMatchActive(false); onMatchEnd && onMatchEnd(); }}
      />
    );
  }

  // ── Question set display ──
  if (questionSet) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, overflowY: "auto" }}>
        {/* Sub-header */}
        <div style={{ padding: "16px 28px", borderBottom: "1px solid #e2d9cf", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fffefb", flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 15, fontWeight: 700, color: "#1c1410", letterSpacing: "0.06em" }}>Question Set — 20 Questions</div>
            <div style={{ fontSize: 12, color: "#7a6f64", marginTop: 2, fontStyle: "italic" }}>
              🔴 {redQuizzers.length} quizzer{redQuizzers.length !== 1 ? "s" : ""} &nbsp;·&nbsp; 🟢 {greenQuizzers.length} quizzer{greenQuizzers.length !== 1 ? "s" : ""}
              &nbsp;·&nbsp; 10×10pt · 7×20pt · 3×30pt
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={generate} style={{ padding: "8px 16px", borderRadius: 8, cursor: "pointer", background: "#fffbeb", border: "1px solid #fcd34d", color: "#b45309", fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.06em" }}>🔄 Regenerate</button>
            <button onClick={() => setQuestionSet(null)} style={{ padding: "8px 16px", borderRadius: 8, cursor: "pointer", background: "#f7f3ee", border: "1px solid #e2d9cf", color: "#7a6f64", fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.06em" }}>← Back to Ranges</button>
            <button onClick={() => { setMatchActive(true); onMatchStart && onMatchStart(); }} style={{
              padding: "8px 20px", borderRadius: 8, cursor: "pointer",
              background: "linear-gradient(135deg,#065f46,#10b981)", border: "none",
              color: "#fff", fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.07em",
              boxShadow: "0 4px 16px rgba(16,185,129,0.35)",
            }}>▶ Start Match</button>
          </div>
        </div>

        {/* Question list */}
        <div style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>
          {questionSet.map((q, i) => {
            const cfg = CR_RANGES[q.points];
            return (
              <div key={q.number} style={{ display: "flex", gap: 14, marginBottom: 16, background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 14, padding: "18px 20px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg,${cfg.badge},${cfg.color})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: 13, color: "#fff" }}>{i + 1}</div>
                  <div style={{ fontSize: 10, color: cfg.color, fontFamily: "'Cinzel',serif", opacity: .7 }}>Q#{q.number}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, borderRadius: 20, padding: "2px 10px", fontSize: 10, fontFamily: "'Cinzel',serif", fontWeight: 700 }}>{q.points} pts</span>
                  </div>
                  <p style={{ margin: "0 0 12px", fontFamily: "Inter,system-ui,sans-serif", fontSize: 16, color: "#1c1410", lineHeight: 1.5 }}>{q.question || <em style={{ color: "#9ca3af" }}>(no question text)</em>}</p>
                  <div style={{ borderLeft: `3px solid ${cfg.color}`, paddingLeft: 12 }}>
                    <div style={{ fontSize: 10, color: cfg.color, fontFamily: "'Cinzel',serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Answer</div>
                    <p style={{ margin: 0, fontFamily: "Inter,system-ui,sans-serif", fontSize: 15, color: "#166534", lineHeight: 1.5, whiteSpace: "pre-line" }}>{q.answer || <em style={{ color: "#9ca3af" }}>(see reference)</em>}</p>
                    {q.reference && <p style={{ margin: "6px 0 0", fontSize: 12, color: "#8abecc", fontStyle: "italic" }}>📖 {q.reference}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Range selector ──
  return (
    <div style={{ flex: 1, padding: "28px 28px", display: "flex", flexDirection: "column", gap: 20, overflowY: "auto" }}>
      {/* Team rosters reminder */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, background: RED.bg, border: `1px solid ${RED.border}`, borderRadius: 12, padding: "12px 16px" }}>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: "#dc2626", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>🔴 Red Team</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {redQuizzers.map((q, i) => (
              <span key={q.id} style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "4px 10px", fontSize: 13, color: "#dc2626" }}>{q.name || `Red ${i + 1}`}</span>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, background: GREEN.bg, border: `1px solid ${GREEN.border}`, borderRadius: 12, padding: "12px 16px" }}>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: "#16a34a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>🟢 Green Team</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {greenQuizzers.map((q, i) => (
              <span key={q.id} style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "4px 10px", fontSize: 13, color: "#16a34a" }}>{q.name || `Green ${i + 1}`}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.14em", color: "#c8860a", textTransform: "uppercase" }}>Question Set Ranges</div>

      {/* Range panels for each category */}
      {[10, 20, 30].map(pts => {
        const cfg = CR_RANGES[pts];
        const count = ALL_QUESTIONS.filter(q => q.points === pts && q.number >= ranges[pts][0] && q.number <= ranges[pts][1]).length;
        const need = pts === 10 ? 10 : pts === 20 ? 7 : 3;
        const ok = count >= need;
        return (
          <div key={pts} style={{ border: `1px solid ${cfg.border}`, borderRadius: 14, background: cfg.bg, padding: "18px 20px" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 14, fontWeight: 700, color: cfg.color, letterSpacing: "0.06em" }}>{cfg.label}</div>
                <div style={{ fontSize: 12, color: cfg.color, opacity: .7, marginTop: 2, fontStyle: "italic" }}>{cfg.desc}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 13, color: ok ? "#4ade80" : "#f87171", fontWeight: 700 }}>{count} available {ok ? "✓" : "✗"}</div>
                <div style={{ fontSize: 11, color: cfg.color, opacity: .6 }}>need {need} to draw from</div>
              </div>
            </div>
            {/* Slider */}
            <CRRangeSlider pts={pts} value={ranges[pts]} onChange={val => setRange(pts, val)} />
            {/* Number inputs */}
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {[["FROM", 0, cfg.min, ranges[pts][1], v => setRange(pts, [Math.max(cfg.min, Math.min(v, ranges[pts][1])), ranges[pts][1]])],
                ["TO",   1, ranges[pts][0], cfg.max, v => setRange(pts, [ranges[pts][0], Math.min(cfg.max, Math.max(v, ranges[pts][0]))])]
              ].map(([lbl, idx, lo, hi, fn]) => (
                <div key={lbl} style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: cfg.color, fontFamily: "'Cinzel',serif", letterSpacing: "0.08em", marginBottom: 5 }}>{lbl}</div>
                  <input type="number" min={lo} max={hi} value={ranges[pts][idx]}
                    onChange={e => fn(Number(e.target.value))}
                    style={{ width: "100%", boxSizing: "border-box", background: "#fffefb", border: `1px solid ${cfg.border}`, borderRadius: 7, padding: "7px 10px", color: "#1c1410", fontFamily: "Inter,system-ui,sans-serif", fontSize: 15, outline: "none" }} />
                  <div style={{ fontSize: 9, color: cfg.color, opacity: .5, marginTop: 3, fontFamily: "'Cinzel',serif" }}>{lbl === "FROM" ? `min:#${cfg.min}` : `max:#${cfg.max}`}</div>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", paddingTop: 20 }}>
                <button onClick={() => setRange(pts, [cfg.min, cfg.max])} title="Reset" style={{ padding: "7px 10px", borderRadius: 6, cursor: "pointer", background: "rgba(255,255,255,0.06)", border: `1px solid ${cfg.border}`, color: cfg.color, fontSize: 15 }}>↺</button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Pool availability summary */}
      <div style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 12, padding: "14px 18px" }}>
        <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, color: "#a855f7", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Set Pool Availability</div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[{ pts: 10, need: 10, avail: avail10 }, { pts: 20, need: 7, avail: avail20 }, { pts: 30, need: 3, avail: avail30 }].map(({ pts, need, avail }) => {
            const ok = avail >= need;
            const cfg = CR_RANGES[pts];
            return (
              <div key={pts} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: cfg.color }} />
                <span style={{ fontSize: 13, color: ok ? "#111827" : "#dc2626" }}>{pts} pts — need {need}, have <strong>{avail}</strong> {ok ? "✓" : "✗"}</span>
              </div>
            );
          })}
        </div>
      </div>

      {genError && (
        <div style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#dc2626", whiteSpace: "pre-line" }}>{genError}</div>
      )}

      {/* Generate button */}
      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
        <button onClick={onBack} style={{ padding: "12px 24px", borderRadius: 10, cursor: "pointer", background: "#f7f3ee", border: "1px solid #e2d9cf", color: "#7a6f64", fontFamily: "'Cinzel',serif", fontSize: 13, letterSpacing: "0.06em" }}>← Back to Teams</button>
        <button onClick={generate} disabled={!canGenerate} style={{
          padding: "12px 28px", borderRadius: 10, cursor: canGenerate ? "pointer" : "not-allowed",
          background: canGenerate ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "rgba(255,255,255,0.04)",
          border: canGenerate ? "none" : "1px solid rgba(255,255,255,0.08)",
          color: canGenerate ? "#fff" : "#4a3020",
          fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.07em",
          boxShadow: canGenerate ? "0 4px 20px rgba(168,85,247,0.35)" : "none",
        }}>⚡ Generate 20-Question Set</button>
      </div>
    </div>
  );
}

function CreateRound({ onClose }) {
  const defaultRed   = (n) => ({ id: Date.now() + n,       name: `Red ${n}`   });
  const defaultGreen = (n) => ({ id: Date.now() + 100 + n, name: `Green ${n}` });

  const [redQuizzers,   setRedQuizzers]   = useState([defaultRed(1), defaultRed(2), defaultRed(3), defaultRed(4)]);
  const [greenQuizzers, setGreenQuizzers] = useState([defaultGreen(1), defaultGreen(2), defaultGreen(3), defaultGreen(4)]);
  const [screen,       setScreen]        = useState("teams"); // "teams" | "questionSet"
  const [matchActive,  setMatchActive]   = useState(false);  // hides header when match is live

  const RED   = { accent: "#dc2626", bg: "#fef2f2", border: "#fecaca" };
  const GREEN = { accent: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" };

  const canProceed = redQuizzers.length >= 1 && greenQuizzers.length >= 1;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "#faf7f2",
      display: "flex", flexDirection: "column",
      fontFamily: "Inter,system-ui,sans-serif", color: "#1c1410",
    }}>
      {/* Header bar — hidden when match is active */}
      {!matchActive && (
        <div style={{
          background: "#fffefb", borderBottom: "1px solid #e5e7eb",
          padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 24 }}>🏆</span>
            <div>
              <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: 20, fontWeight: 700, color: "#1c1410", margin: 0, letterSpacing: "0.04em" }}>Create a Round</h2>
              <p style={{ margin: 0, fontSize: 12, color: "#6b7280", fontStyle: "italic" }}>
                {screen === "teams" ? "Set up your two teams" : "Build your 20-question set"}
              </p>
            </div>
          </div>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: screen === "teams" ? "#d97706" : "#9ca3af", letterSpacing: "0.06em" }}>1 · Teams</span>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: screen === "questionSet" ? "#d97706" : "#9ca3af", letterSpacing: "0.06em" }}>2 · Question Set</span>
            <div style={{ width: 1, height: 20, background: "#e5e7eb", margin: "0 8px" }} />
            <button onClick={onClose} style={{ padding: "8px 18px", borderRadius: 8, cursor: "pointer", background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151", fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: "0.04em" }}>✕ Close</button>
          </div>
        </div>
      )}

      {/* Step 1 — Teams */}
      {screen === "teams" && (
        <div style={{ flex: 1, padding: "28px 28px", display: "flex", flexDirection: "column", gap: 22, maxWidth: 960, width: "100%", margin: "0 auto", overflowY: "auto" }}>
          <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "12px 18px", fontSize: 14, color: "#92400e", textAlign: "center", fontStyle: "italic" }}>
            Each team can have 1–8 quizzers. Names default to team color + number — click any name to edit it.
          </div>

          <div className="teams-layout" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            <TeamSetup color="red"   teamName="Red Team"   {...RED}   quizzers={redQuizzers}   setQuizzers={setRedQuizzers} />
            <div className="teams-vs" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 60, gap: 8, flexShrink: 0 }}>
              <div style={{ width: 2, height: 40, background: "#e5e7eb", borderRadius: 1 }} />
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 18, fontWeight: 700, color: "#d1d5db", letterSpacing: "0.1em" }}>VS</div>
              <div style={{ width: 2, height: 40, background: "#e5e7eb", borderRadius: 1 }} />
            </div>
            <TeamSetup color="green" teamName="Green Team" {...GREEN} quizzers={greenQuizzers} setQuizzers={setGreenQuizzers} />
          </div>

          {/* Summary + next */}
          <div style={{ display: "flex", gap: 16, padding: "16px 20px", background: "#fffefb", border: "1px solid #e5e7eb", borderRadius: 12, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: "#b45309", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Round Summary</div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <span style={{ fontSize: 14, color: "#dc2626" }}>🔴 Red Team — {redQuizzers.length} quizzer{redQuizzers.length !== 1 ? "s" : ""}</span>
                <span style={{ fontSize: 14, color: "#16a34a" }}>🟢 Green Team — {greenQuizzers.length} quizzer{greenQuizzers.length !== 1 ? "s" : ""}</span>
              </div>
              {/* Roster chips */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                {redQuizzers.map((q, i) => (
                  <span key={q.id} style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "3px 10px", fontSize: 12, color: "#dc2626" }}>{q.name || `Red ${i + 1}`}</span>
                ))}
                {greenQuizzers.map((q, i) => (
                  <span key={q.id} style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "3px 10px", fontSize: 12, color: "#16a34a" }}>{q.name || `Green ${i + 1}`}</span>
                ))}
              </div>
            </div>
            <button
              disabled={!canProceed}
              onClick={() => setScreen("questionSet")}
              style={{
                padding: "12px 28px", borderRadius: 10,
                cursor: canProceed ? "pointer" : "not-allowed",
                background: canProceed ? "linear-gradient(135deg,#065f46,#10b981)" : "#f3f4f6",
                border: canProceed ? "none" : "1px solid #e5e7eb",
                color: canProceed ? "#fff" : "#9ca3af",
                fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.07em",
                boxShadow: canProceed ? "0 4px 20px rgba(16,185,129,0.3)" : "none",
                whiteSpace: "nowrap",
              }}
            >Question Set →</button>
          </div>
        </div>
      )}

      {/* Step 2 — Question Set */}
      {screen === "questionSet" && (
        <CreateRoundSet
          redQuizzers={redQuizzers}
          greenQuizzers={greenQuizzers}
          onBack={() => setScreen("teams")}
          onClose={onClose}
          onMatchStart={() => setMatchActive(true)}
          onMatchEnd={() => setMatchActive(false)}
        />
      )}
    </div>
  );
}

// ── Quizzing Window ──────────────────────────────────────────────────────────
function QuizzingWindow({ questions, onClose, onRegenerate }) {
  const [current,   setCurrent]   = useState(0);
  const [finished,  setFinished]  = useState(false);
  // rulings: { [index]: { correct: bool, interrupted: bool } | null }
  const [rulings,   setRulings]   = useState({});

  const q         = questions[current];
  const c         = PT_CFG[q.points];
  const totalPts  = questions.reduce((s,q) => s+q.points, 0);
  const ruling    = rulings[current];

  const setRuling = (key, val) => {
    setRulings(r => ({ ...r, [current]: { ...(r[current] || {}), [key]: val } }));
  };

  const next = () => {
    if (current < questions.length - 1) setCurrent(c => c+1);
    else setFinished(true);
  };
  const prev     = () => { if (current > 0) setCurrent(c => c-1); };
  const restart  = () => { setCurrent(0); setFinished(false); setRulings({}); };
  const quit     = () => setFinished(true);

  const progress  = ((current + 1) / questions.length) * 100;
  const countByPts = (pts) => questions.filter(q=>q.points===pts).length;

  // Stats calculations
  const answered = Object.values(rulings).filter(r => r && r.correct !== undefined);
  const statsByPts = (pts) => {
    const qs = questions.map((q, i) => ({ q, i })).filter(({q}) => q.points === pts);
    const res = { total: qs.length, correct: 0, incorrect: 0, intCorrect: 0, intIncorrect: 0, notIntCorrect: 0, notIntIncorrect: 0 };
    qs.forEach(({ i }) => {
      const r = rulings[i];
      if (!r || r.correct === undefined) return;
      if (r.correct) {
        res.correct++;
        if (r.interrupted) res.intCorrect++; else res.notIntCorrect++;
      } else {
        res.incorrect++;
        if (r.interrupted) res.intIncorrect++; else res.notIntIncorrect++;
      }
    });
    return res;
  };

  const RulingBtn = ({ active, onClick, label, icon, activeColor, activeBg, activeBorder }) => (
    <button onClick={onClick} style={{
      flex: 1, padding: "8px 6px", borderRadius: 8, cursor: "pointer",
      border: `2px solid ${active ? activeBorder : "#e2d9cf"}`,
      background: active ? activeBg : "#f7f3ee",
      color: active ? activeColor : "#9ca3af",
      fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
      transition: "all .12s",
    }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span>{label}</span>
    </button>
  );

  if (finished) {
    // Stats report
    const allStats = [10, 20, 30].map(pts => ({ pts, ...statsByPts(pts) })).filter(s => s.total > 0);
    const totalCorrect   = allStats.reduce((s, x) => s + x.correct, 0);
    const totalIncorrect = allStats.reduce((s, x) => s + x.incorrect, 0);
    const totalAnswered  = totalCorrect + totalIncorrect;
    const pct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

    return (
      <div style={{ position:"fixed", inset:0, zIndex:1000, background:"#faf7f2", display:"flex", flexDirection:"column", fontFamily:"Inter,system-ui,sans-serif", color:"#1c1410", overflowY:"auto" }}>
        {/* Header */}
        <div style={{ background:"#fffefb", borderBottom:"1px solid #fde68a", padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:18, fontWeight:700, color:"#c26a14", margin:0 }}>Practice Set — Results</h2>
            <p style={{ margin:0, fontSize:13, color:"#7a6f64", marginTop:2 }}>{questions.length} questions · {totalPts} pts total</p>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={restart}      style={{ padding:"8px 16px", borderRadius:8, background:"#f0ebe3", border:"1px solid #d4c9bc", color:"#4a3f35", fontFamily:"'Cinzel',serif", fontSize:12, cursor:"pointer" }}>↺ Review Again</button>
            <button onClick={onRegenerate} style={{ padding:"8px 16px", borderRadius:8, background:"#faeec8", border:"1px solid #fde68a", color:"#c26a14", fontFamily:"'Cinzel',serif", fontSize:12, cursor:"pointer" }}>🔄 New Set</button>
            <button onClick={onClose}      style={{ padding:"8px 16px", borderRadius:8, background:"#f0ebe3", border:"1px solid #d4c9bc", color:"#4a3f35", fontFamily:"'Cinzel',serif", fontSize:12, cursor:"pointer" }}>✕ Close</button>
          </div>
        </div>

        <div style={{ flex:1, maxWidth:820, width:"100%", margin:"0 auto", padding:"28px 24px", display:"flex", flexDirection:"column", gap:24 }}>

          {/* Overall score */}
          <div style={{ background:"#fffefb", border:"1px solid #e2d9cf", borderRadius:16, padding:"24px 28px", display:"flex", alignItems:"center", gap:24, flexWrap:"wrap" }}>
            <div style={{ textAlign:"center", flex:"0 0 auto" }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:52, fontWeight:700, color: pct >= 70 ? "#16a34a" : pct >= 50 ? "#b45309" : "#dc2626", lineHeight:1 }}>{pct}%</div>
              <div style={{ fontSize:13, color:"#7a6f64", marginTop:4 }}>overall correct</div>
            </div>
            <div style={{ flex:1, display:"flex", gap:16, flexWrap:"wrap" }}>
              <div style={{ flex:1, background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:12, padding:"14px 18px", textAlign:"center" }}>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:28, fontWeight:700, color:"#16a34a" }}>{totalCorrect}</div>
                <div style={{ fontSize:13, color:"#16a34a", marginTop:2 }}>Correct</div>
              </div>
              <div style={{ flex:1, background:"#fef2f2", border:"1px solid #fecaca", borderRadius:12, padding:"14px 18px", textAlign:"center" }}>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:28, fontWeight:700, color:"#dc2626" }}>{totalIncorrect}</div>
                <div style={{ fontSize:13, color:"#dc2626", marginTop:2 }}>Incorrect</div>
              </div>
              <div style={{ flex:1, background:"#f7f3ee", border:"1px solid #e2d9cf", borderRadius:12, padding:"14px 18px", textAlign:"center" }}>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:28, fontWeight:700, color:"#7a6f64" }}>{questions.length - totalAnswered}</div>
                <div style={{ fontSize:13, color:"#7a6f64", marginTop:2 }}>Skipped</div>
              </div>
            </div>
          </div>

          {/* Per-category breakdown */}
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, fontWeight:700, color:"#9a4a10", letterSpacing:"0.12em", textTransform:"uppercase" }}>Breakdown by Category</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {allStats.map(({ pts, total, correct, incorrect, intCorrect, intIncorrect, notIntCorrect, notIntIncorrect }) => {
              const dc = PT_CFG[pts];
              const answered = correct + incorrect;
              const catPct = answered > 0 ? Math.round((correct / answered) * 100) : null;
              return (
                <div key={pts} style={{ background:"#fffefb", border:`1px solid ${dc.border}`, borderRadius:14, padding:"18px 22px" }}>
                  {/* Category header */}
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                    <div style={{ width:44, height:44, borderRadius:10, background:`linear-gradient(135deg,${dc.badge},${dc.color})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cinzel',serif", fontWeight:700, fontSize:15, color:"#fff", flexShrink:0 }}>{pts}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, color:dc.color, letterSpacing:"0.04em" }}>{pts}-Point Questions</div>
                      <div style={{ fontSize:13, color:"#7a6f64", marginTop:1 }}>{total} questions · {answered} answered</div>
                    </div>
                    {catPct !== null && (
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontFamily:"'Cinzel',serif", fontSize:24, fontWeight:700, color: catPct >= 70 ? "#16a34a" : catPct >= 50 ? "#b45309" : "#dc2626" }}>{catPct}%</div>
                        <div style={{ fontSize:12, color:"#7a6f64" }}>{correct}/{answered} correct</div>
                      </div>
                    )}
                    {catPct === null && <div style={{ fontSize:13, color:"#a89c92", fontStyle:"italic" }}>not answered</div>}
                  </div>

                  {/* Interrupted vs Not-Interrupted grid */}
                  {answered > 0 && (
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                      <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, fontWeight:700, color:"#b45309", marginBottom:8 }}>✋ Interrupted ({intCorrect + intIncorrect})</div>
                        <div style={{ display:"flex", gap:12 }}>
                          <div style={{ flex:1, textAlign:"center" }}>
                            <div style={{ fontFamily:"'Cinzel',serif", fontSize:20, fontWeight:700, color:"#16a34a" }}>{intCorrect}</div>
                            <div style={{ fontSize:12, color:"#16a34a" }}>Correct</div>
                          </div>
                          <div style={{ width:1, background:"#fde68a" }} />
                          <div style={{ flex:1, textAlign:"center" }}>
                            <div style={{ fontFamily:"'Cinzel',serif", fontSize:20, fontWeight:700, color:"#dc2626" }}>{intIncorrect}</div>
                            <div style={{ fontSize:12, color:"#dc2626" }}>Incorrect</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, fontWeight:700, color:"#1d4ed8", marginBottom:8 }}>📖 Not Interrupted ({notIntCorrect + notIntIncorrect})</div>
                        <div style={{ display:"flex", gap:12 }}>
                          <div style={{ flex:1, textAlign:"center" }}>
                            <div style={{ fontFamily:"'Cinzel',serif", fontSize:20, fontWeight:700, color:"#16a34a" }}>{notIntCorrect}</div>
                            <div style={{ fontSize:12, color:"#16a34a" }}>Correct</div>
                          </div>
                          <div style={{ width:1, background:"#bfdbfe" }} />
                          <div style={{ flex:1, textAlign:"center" }}>
                            <div style={{ fontFamily:"'Cinzel',serif", fontSize:20, fontWeight:700, color:"#dc2626" }}>{notIntIncorrect}</div>
                            <div style={{ fontSize:12, color:"#dc2626" }}>Incorrect</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        * { -webkit-tap-highlight-color: transparent; }
        input[type=range] { width: 100%; }
        @media (max-width: 640px) {
          .teams-layout { flex-direction: column !important; }
          .teams-vs { display: none !important; }
          .home-cards { flex-direction: column !important; align-items: stretch !important; }
          .home-card  { max-width: 100% !important; }
          .browse-layout { flex-direction: column !important; height: auto !important; }
          .browse-sidebar { width: 100% !important; max-height: 340px; border-right: none !important; border-bottom: 1px solid #e2d9cf !important; }
          .match-team-left  { width: 100% !important; border-right: none !important; border-bottom: 1px solid #e2d9cf; max-height: none !important; }
          .match-team-right { width: 100% !important; border-left: none !important;  border-top: 1px solid #e2d9cf; max-height: none !important; }
          .match-3col { flex-direction: column !important; overflow: visible !important; }
          .match-scoreboard { font-size: 22px !important; }
          .report-quizzer-grid { grid-template-columns: 1fr !important; }
          .practice-mode-cards { flex-direction: column !important; }
        }
      `}</style>
      </div>
    );
  }

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:1000,
      background:"#faf7f2",
      display:"flex", flexDirection:"column",
      fontFamily:"Inter,system-ui,sans-serif", color:"#1c1410",
      overflowY:"auto",
    }}>
      {/* Header */}
      <div style={{ background:"#fffefb", borderBottom:"1px solid #fde68a", padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <span style={{ fontSize:22 }}>⚡</span>
          <div>
            <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:18, fontWeight:700, color:"#c26a14", margin:0, letterSpacing:"0.06em" }}>Practice Set</h2>
            <p style={{ margin:0, fontSize:12, color:"#7a6f64", fontStyle:"italic" }}>
              {questions.length} Questions · {countByPts(10)} × 10pt · {countByPts(20)} × 20pt · {countByPts(30)} × 30pt
            </p>
          </div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onRegenerate} style={{ padding:"8px 16px", borderRadius:8, background:"#faeec8", border:"1px solid #fde68a", color:"#c26a14", fontFamily:"'Cinzel',serif", fontSize:11, cursor:"pointer", letterSpacing:"0.06em" }}>🔄 New Set</button>
          <button onClick={quit}         style={{ padding:"8px 16px", borderRadius:8, background:"#fef2f2", border:"1px solid #fecaca", color:"#dc2626", fontFamily:"'Cinzel',serif", fontSize:11, cursor:"pointer", letterSpacing:"0.06em" }}>⏹ Finish & See Stats</button>
          <button onClick={onClose}      style={{ padding:"8px 16px", borderRadius:8, background:"#f0ebe3", border:"1px solid #d4c9bc", color:"#4a3f35", fontFamily:"'Cinzel',serif", fontSize:11, cursor:"pointer", letterSpacing:"0.06em" }}>✕ Close</button>
        </div>
      </div>

      <div style={{ flex:1, display:"flex", flexDirection:"column", maxWidth:780, margin:"0 auto", width:"100%", padding:"28px 24px" }}>
        {/* Progress */}
        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontFamily:"'Cinzel',serif", fontSize:13, fontWeight:600, color:"#4a3f35", letterSpacing:"0.04em" }}>QUESTION {current+1} OF {questions.length}</span>
            <span style={{ fontFamily:"'Cinzel',serif", fontSize:13, color:"#4a3f35" }}>{Math.round(progress)}% complete</span>
          </div>
          <div style={{ height:6, background:"#f0ebe3", borderRadius:3, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#c8860a,#f0a500)", borderRadius:3, transition:"width .3s" }} />
          </div>
          <div style={{ display:"flex", gap:4, marginTop:10, flexWrap:"wrap" }}>
            {questions.map((qd, i) => {
              const dc  = PT_CFG[qd.points];
              const r   = rulings[i];
              const isDone = r && r.correct !== undefined;
              const isCur  = i === current;
              const bg  = isDone ? (r.correct ? "#16a34a" : "#dc2626") : isCur ? dc.bg : "#f0ebe3";
              const bdr = isDone ? (r.correct ? "#16a34a" : "#dc2626") : isCur ? dc.color : "#d4c9bc";
              return (
                <div key={i} onClick={() => setCurrent(i)} title={`Q${qd.number} (${qd.points}pts)`} style={{
                  width:22, height:22, borderRadius:5, cursor:"pointer",
                  background: bg, border:`1px solid ${bdr}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:10, fontWeight:700, color: isDone ? "#fff" : isCur ? dc.color : "#7a6f64",
                  fontFamily:"'Cinzel',serif", transition:"all .15s",
                }}>{i+1}</div>
              );
            })}
          </div>
        </div>

        {/* Question card */}
        <div style={{ background:c.bg, border:`2px solid ${c.border}`, borderRadius:18, padding:"28px 32px", marginBottom:20, boxShadow:"0 2px 12px rgba(0,0,0,0.08)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
            <div style={{ width:48, height:48, borderRadius:12, background:`linear-gradient(135deg,${c.badge},${c.color})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cinzel',serif", fontWeight:700, fontSize:16, color:"#fff" }}>{q.number}</div>
            <div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, fontWeight:700, color:c.color, letterSpacing:"0.1em", textTransform:"uppercase" }}>{q.points}-Point Question</div>
              <div style={{ fontSize:12, color:"#a89c92", marginTop:2 }}>Question {current+1} of {questions.length}</div>
            </div>
          </div>
          <p style={{ fontFamily:"Inter,system-ui,sans-serif", fontSize:20, color:"#1c1410", lineHeight:1.55, margin:"0 0 24px" }}>{q.question || <em style={{color:"#a89c92"}}>(no question text)</em>}</p>
          <div style={{ borderTop:`1px solid ${c.border}`, paddingTop:20 }}>
            <div style={{ fontSize:12, fontWeight:700, color:c.color, fontFamily:"'Cinzel',serif", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>Answer</div>
            <p style={{ fontFamily:"Inter,system-ui,sans-serif", fontSize:18, color:"#1c1410", lineHeight:1.55, margin:"0 0 12px", whiteSpace:"pre-line" }}>{q.answer || <em style={{color:"#a89c92"}}>(see reference)</em>}</p>
            {q.reference && (
              <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#0369a1", fontFamily:"'Cinzel',serif", letterSpacing:"0.08em", marginTop:2, flexShrink:0 }}>REF</span>
                <span style={{ fontSize:13, color:"#0369a1", fontStyle:"italic" }}>{q.reference}</span>
              </div>
            )}
          </div>
        </div>

        {/* Ruling controls */}
        <div style={{ background:"#fffefb", border:"1px solid #e2d9cf", borderRadius:14, padding:"16px 20px", marginBottom:20 }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, fontWeight:700, color:"#9a4a10", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>Mark This Question</div>
          <div style={{ display:"flex", gap:10, marginBottom:12 }}>
            <RulingBtn active={ruling?.correct === true}  onClick={() => setRuling("correct", true)}  label="Correct"   icon="✅" activeColor="#16a34a" activeBg="#f0fdf4" activeBorder="#86efac" />
            <RulingBtn active={ruling?.correct === false} onClick={() => setRuling("correct", false)} label="Incorrect" icon="❌" activeColor="#dc2626" activeBg="#fef2f2" activeBorder="#fca5a5" />
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <RulingBtn active={ruling?.interrupted === true}  onClick={() => setRuling("interrupted", true)}  label="Interrupted"     icon="✋" activeColor="#b45309" activeBg="#fffbeb" activeBorder="#fcd34d" />
            <RulingBtn active={ruling?.interrupted === false} onClick={() => setRuling("interrupted", false)} label="Not Interrupted" icon="📖" activeColor="#1d4ed8" activeBg="#eff6ff" activeBorder="#bfdbfe" />
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display:"flex", gap:12, justifyContent:"space-between" }}>
          <button onClick={prev} disabled={current===0} style={{ padding:"12px 24px", borderRadius:10, cursor:current===0?"default":"pointer", background:"#f0ebe3", border:"1px solid #d4c9bc", color:current===0?"#a89c92":"#4a3f35", fontFamily:"'Cinzel',serif", fontSize:13, letterSpacing:"0.06em" }}>← Previous</button>
          <button onClick={next} style={{ padding:"12px 32px", borderRadius:10, cursor:"pointer", background:`linear-gradient(135deg,${c.badge},${c.color})`, border:"none", color:"#fff", fontFamily:"'Cinzel',serif", fontSize:13, fontWeight:700, letterSpacing:"0.06em" }}>
            {current === questions.length-1 ? "Finish & See Stats ✓" : "Next →"}
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        * { -webkit-tap-highlight-color: transparent; }
        input[type=range] { width: 100%; }
        @media (max-width: 640px) {
          .teams-layout { flex-direction: column !important; }
          .teams-vs { display: none !important; }
          .home-cards { flex-direction: column !important; align-items: stretch !important; }
          .home-card  { max-width: 100% !important; }
          .browse-layout { flex-direction: column !important; height: auto !important; }
          .browse-sidebar { width: 100% !important; max-height: 340px; border-right: none !important; border-bottom: 1px solid #e2d9cf !important; }
          .match-team-left  { width: 100% !important; border-right: none !important; border-bottom: 1px solid #e2d9cf; max-height: none !important; }
          .match-team-right { width: 100% !important; border-left: none !important;  border-top: 1px solid #e2d9cf; max-height: none !important; }
          .match-3col { flex-direction: column !important; overflow: visible !important; }
          .match-scoreboard { font-size: 22px !important; }
          .report-quizzer-grid { grid-template-columns: 1fr !important; }
          .practice-mode-cards { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}

// ── BrowseQuestions ───────────────────────────────────────────────────────────
function BrowseQuestions({ onClose }) {
  const [enabled,  setEnabled]  = useState({10:true,20:true,30:true});
  const [ranges,   setRanges]   = useState(INIT_RANGES);
  const [search,   setSearch]   = useState("");
  const [showRef,  setShowRef]  = useState(true);
  const [quizMode, setQuizMode] = useState(false);
  const [revealed, setRevealed] = useState({});
  const [page,     setPage]     = useState(1);
  const PAGE_SIZE = 20;

  const togglePts = pts => { setEnabled(e=>({...e,[pts]:!e[pts]})); setPage(1); };
  const setRange  = (pts,val) => { setRanges(r=>({...r,[pts]:val})); setPage(1); };

  const filtered = useMemo(() => {
    let qs = ALL_QUESTIONS.filter(q => {
      if (!enabled[q.points]) return false;
      const [lo,hi] = ranges[q.points];
      return q.number>=lo && q.number<=hi;
    });
    if (search.trim()) {
      const kw = search.trim().toLowerCase();
      qs = qs.filter(q=>q.question.toLowerCase().includes(kw)||q.answer.toLowerCase().includes(kw)||q.reference.toLowerCase().includes(kw));
    }
    return qs;
  }, [enabled,ranges,search]);

  const totalPages = Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  const safeP = Math.min(page,totalPages);
  const paged = filtered.slice((safeP-1)*PAGE_SIZE, safeP*PAGE_SIZE);

  const Btn = ({onClick,disabled,children}) => (
    <button onClick={onClick} disabled={disabled} style={{ padding:"6px 14px", borderRadius:7, background:"#f0ebe3", border:"1px solid #d4c9bc", color:disabled?"#3a2010":"#c8a060", cursor:disabled?"default":"pointer", fontFamily:"'Cinzel',serif", fontSize:11 }}>{children}</button>
  );

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, background:"#faf7f2", display:"flex", flexDirection:"column", fontFamily:"Inter,system-ui,sans-serif", color:"#1c1410" }}>

      {/* Header */}
      <div style={{ padding:"14px 24px", borderBottom:"1px solid #e2d9cf", display:"flex", alignItems:"center", gap:14, flexShrink:0, background:"#f0ebe3" }}>
        <button onClick={onClose} style={{ padding:"7px 14px", borderRadius:8, cursor:"pointer", background:"#f0ebe3", border:"1px solid #d4c9bc", color:"#4a3f35", fontFamily:"'Cinzel',serif", fontSize:12, letterSpacing:"0.05em" }}>← Back</button>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:18, fontWeight:700, color:"#c26a14", letterSpacing:"0.04em" }}>📖 Browse Questions</div>
          <div style={{ fontSize:12, color:"#7a6f64", marginTop:1 }}>{filtered.length} question{filtered.length!==1?"s":""} · {ALL_QUESTIONS.length} total</div>
        </div>
        <label style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"#a89c92", cursor:"pointer", userSelect:"none" }}>
          <input type="checkbox" checked={showRef} onChange={e=>setShowRef(e.target.checked)} style={{accentColor:"#f0a500"}}/> Refs
        </label>
        <label style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"#a89c92", cursor:"pointer", userSelect:"none" }}>
          <input type="checkbox" checked={quizMode} onChange={e=>{setQuizMode(e.target.checked);setRevealed({});}} style={{accentColor:"#f0a500"}}/> Quiz Mode
        </label>
      </div>

      <div className="browse-layout" style={{ flex:1, display:"flex", overflow:"hidden" }}>

        {/* Sidebar */}
        <div style={{ width:240, flexShrink:0, padding:"16px 14px", borderRight:"1px solid rgba(255,255,255,0.07)", background:"#f7f3ee", overflowY:"auto", display:"flex", flexDirection:"column", gap:14 }}>

          {/* Search */}
          <div>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, letterSpacing:"0.1em", fontWeight:700, color:"#9a4a10", marginBottom:6, textTransform:"uppercase" }}>Search</div>
            <input
              style={{ width:"100%", boxSizing:"border-box", background:"#f0ebe3", border:"1px solid #d4c9bc", borderRadius:8, padding:"8px 12px", color:"#1c1410", fontFamily:"Inter,system-ui,sans-serif", fontSize:15, outline:"none" }}
              placeholder="Keyword in Q, A, or Ref…" value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} />
          </div>

          {/* Categories */}
          <div>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, letterSpacing:"0.1em", fontWeight:700, color:"#9a4a10", marginBottom:8, textTransform:"uppercase" }}>Categories</div>
            {[10,20,30].map(pts=>(
              <CategoryPanel key={pts} pts={pts} enabled={enabled[pts]} onToggle={()=>togglePts(pts)} range={ranges[pts]} onRange={val=>setRange(pts,val)} />
            ))}
          </div>

          <div style={{ height:1, background:"#f0ebe3" }} />

          {/* Summary */}
          <div style={{ background:"#f7f3ee", border:"1px solid #e2d9cf", borderRadius:9, padding:"10px 12px" }}>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, fontWeight:700, color:"#4a3f35", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>Summary</div>
            {[10,20,30].map(pts => {
              const cnt = enabled[pts] ? ALL_QUESTIONS.filter(q=>q.points===pts&&q.number>=ranges[pts][0]&&q.number<=ranges[pts][1]).length : 0;
              return (
                <div key={pts} style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:12, color: enabled[pts] ? PT_CFG[pts].color : "#4a3020" }}>{pts}pt questions</span>
                  <span style={{ fontSize:12, color: enabled[pts] ? "#111827" : "#9ca3af", fontFamily:"'Cinzel',serif" }}>{enabled[pts] ? cnt : "off"}</span>
                </div>
              );
            })}
            <div style={{ height:1, background:"#f0ebe3", margin:"7px 0" }} />
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:12, color:"#7a6f64" }}>Showing</span>
              <span style={{ fontSize:12, color:"#c26a14", fontFamily:"'Cinzel',serif", fontWeight:700 }}>{filtered.length}</span>
            </div>
          </div>

          {/* Reset */}
          <button onClick={()=>{setSearch("");setEnabled({10:true,20:true,30:true});setRanges(INIT_RANGES);setPage(1);}} style={{ padding:"8px", borderRadius:7, background:"#f0ebe3", border:"1px solid #e2d9cf", color:"#a89c92", fontFamily:"'Cinzel',serif", fontSize:11, cursor:"pointer" }}>Reset Filters</button>

          {quizMode && (
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <button onClick={()=>{const m={};paged.forEach(q=>{m[q.number]=true;});setRevealed(r=>({...r,...m}));}} style={{ padding:"8px", borderRadius:7, background:"#faeec8", color:"#c26a14", fontFamily:"'Cinzel',serif", fontSize:11, fontWeight:700, cursor:"pointer", border:"1px solid #fcd34d" }}>Reveal this page</button>
              <button onClick={()=>setRevealed({})} style={{ padding:"8px", borderRadius:7, background:"#f0ebe3", color:"#7a6f64", fontFamily:"'Cinzel',serif", fontSize:11, cursor:"pointer", border:"1px solid #e2d9cf" }}>Hide all</button>
            </div>
          )}
        </div>

        {/* Question list */}
        <div style={{ flex:1, padding:"16px 24px", overflowY:"auto" }}>
          {paged.length===0 ? (
            <div style={{ textAlign:"center", marginTop:80, color:"#a89c92" }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:14 }}>No questions match.</p>
            </div>
          ) : paged.map(q=>(
            <QuizCard key={q.number} q={q} quizMode={quizMode} revealed={!!revealed[q.number]} showRef={showRef} onReveal={()=>setRevealed(r=>({...r,[q.number]:true}))} />
          ))}
          {totalPages>1 && (
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginTop:20, paddingBottom:24 }}>
              <Btn onClick={()=>setPage(1)} disabled={safeP===1}>«</Btn>
              <Btn onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={safeP===1}>← Prev</Btn>
              <span style={{ fontFamily:"'Cinzel',serif", fontSize:12, color:"#7a6f64", minWidth:80, textAlign:"center" }}>{safeP} / {totalPages}</span>
              <Btn onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={safeP===totalPages}>Next →</Btn>
              <Btn onClick={()=>setPage(totalPages)} disabled={safeP===totalPages}>»</Btn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── PracticeSetup ─────────────────────────────────────────────────────────────
function PracticeSetup({ onGenerate, onClose }) {
  const [mode,    setMode]    = useState(null);   // null | "official" | "custom"
  const [ranges,  setRanges]  = useState(INIT_RANGES);
  // Non-official: user picks which categories to include and how many from each
  const [custEnabled, setCustEnabled] = useState({ 10: true, 20: true, 30: true });
  const [custCount,   setCustCount]   = useState({ 10: 10,   20: 7,    30: 3   });
  const [error, setError] = useState("");

  const setRange = (pts, val) => setRanges(r => ({ ...r, [pts]: val }));

  // ── Official pools ──
  const offPool = (pts) => {
    const lo = ranges[pts][0], hi = ranges[pts][1];
    if (pts === 30) {
      // Official restricts 30pt to Q#453–467
      return ALL_QUESTIONS.filter(q => q.points === 30 && q.number >= Math.max(lo,453) && q.number <= Math.min(hi,467) && q.question);
    }
    return ALL_QUESTIONS.filter(q => q.points === pts && q.number >= lo && q.number <= hi && q.question);
  };
  const offPools  = { 10: offPool(10), 20: offPool(20), 30: offPool(30) };
  const offCanGen = offPools[10].length >= 10 && offPools[20].length >= 7 && offPools[30].length >= 3;

  // ── Custom pools ──
  const custPool = (pts) => ALL_QUESTIONS.filter(q =>
    q.points === pts && q.number >= ranges[pts][0] && q.number <= ranges[pts][1] && q.question
  );
  const custPools = { 10: custPool(10), 20: custPool(20), 30: custPool(30) };
  const custCanGen = [10, 20, 30].some(pts =>
    custEnabled[pts] && custCount[pts] > 0 && custPools[pts].length >= custCount[pts]
  ) && [10, 20, 30].every(pts =>
    !custEnabled[pts] || custCount[pts] === 0 || custPools[pts].length >= custCount[pts]
  );

  const generateOfficial = () => {
    setError("");
    const errs = [];
    if (offPools[10].length < 10) errs.push(`10pt: need 10, only ${offPools[10].length} available in Q#${ranges[10][0]}–${ranges[10][1]}`);
    if (offPools[20].length < 7)  errs.push(`20pt: need 7, only ${offPools[20].length} available in Q#${ranges[20][0]}–${ranges[20][1]}`);
    if (offPools[30].length < 3)  errs.push(`30pt: need 3, only ${offPools[30].length} available (Q#453–467)`);
    if (errs.length) { setError(errs.join("\n")); return; }
    onGenerate(shuffle([
      ...pickRandom(offPools[10], 10),
      ...pickRandom(offPools[20], 7),
      ...pickRandom(offPools[30], 3),
    ]));
  };

  const generateCustom = () => {
    setError("");
    const errs = [];
    let all = [];
    [10, 20, 30].forEach(pts => {
      if (!custEnabled[pts]) return;
      const n = custCount[pts];
      if (n < 1) return;
      if (custPools[pts].length < n) {
        errs.push(`${pts}pt: need ${n}, only ${custPools[pts].length} available in Q#${ranges[pts][0]}–${ranges[pts][1]}`);
      } else {
        all = [...all, ...pickRandom(custPools[pts], n)];
      }
    });
    if (errs.length) { setError(errs.join("\n")); return; }
    if (all.length === 0) { setError("Select at least one category with a count above 0."); return; }
    onGenerate(shuffle(all));
  };

  const CAT = [
    { pts:10, color:"#2563eb", bg:"rgba(96,165,250,0.08)",  border:"#bfdbfe",  label:"10-Point", offPick:10 },
    { pts:20, color:"#9a4a10", bg:"rgba(251,191,36,0.08)",  border:"rgba(251,191,36,0.25)",  label:"20-Point", offPick:7  },
    { pts:30, color:"#dc2626", bg:"#fef2f2", border:"#fecaca", label:"30-Point", offPick:3  },
  ];

  // ── Step 1: mode picker ──
  if (!mode) return (
    <div style={{ position:"fixed", inset:0, zIndex:3000, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"Inter,system-ui,sans-serif" }}>
      <div style={{ background:"#fffefb", border:"1px solid #d4c9bc", borderRadius:20, width:"100%", maxWidth:480, boxShadow:"0 8px 30px rgba(0,0,0,0.12)", overflow:"hidden" }}>
        <div style={{ padding:"22px 24px 18px", borderBottom:"1px solid #e2d9cf", display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ fontSize:28 }}>⚡</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:17, fontWeight:700, color:"#7c3aed", letterSpacing:"0.04em" }}>Practice Set</div>
            <div style={{ fontSize:13, color:"#7a6f64", marginTop:2 }}>Choose a practice type</div>
          </div>
          <button onClick={onClose} style={{ width:30, height:30, borderRadius:8, border:"1px solid #d4c9bc", background:"#f0ebe3", color:"#7a6f64", cursor:"pointer", fontSize:16 }}>✕</button>
        </div>
        <div className="practice-mode-cards" style={{ padding:"24px", display:"flex", flexDirection:"column", gap:14 }}>

          {/* Official */}
          <div onClick={() => setMode("official")}
            style={{ background:"#f5f0fc", border:"1px solid #ddd6fe", borderRadius:14, padding:"20px 22px", cursor:"pointer", transition:"all .15s" }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(168,85,247,0.14)";e.currentTarget.style.borderColor="rgba(168,85,247,0.5)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(168,85,247,0.07)";e.currentTarget.style.borderColor="rgba(168,85,247,0.28)";}}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
              <span style={{ fontSize:24 }}>📋</span>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, color:"#7c3aed", letterSpacing:"0.04em" }}>Official Practice Set</div>
            </div>
            <div style={{ fontSize:13, color:"#7a6f64", lineHeight:1.6 }}>
              Standard format — <strong style={{color:"#7c3aed"}}>10 × 10pt, 7 × 20pt, 3 × 30pt</strong> — 20 questions total. You choose the question number ranges. 30pt is restricted to Q#453–467.
            </div>
          </div>

          {/* Non-official */}
          <div onClick={() => setMode("custom")}
            style={{ background:"#fdf6e8", border:"1px solid rgba(251,191,36,0.22)", borderRadius:14, padding:"20px 22px", cursor:"pointer", transition:"all .15s" }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(251,191,36,0.12)";e.currentTarget.style.borderColor="rgba(251,191,36,0.45)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(251,191,36,0.06)";e.currentTarget.style.borderColor="rgba(251,191,36,0.22)";}}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
              <span style={{ fontSize:24 }}>🎲</span>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, color:"#9a4a10", letterSpacing:"0.04em" }}>Non-Official Practice Set</div>
            </div>
            <div style={{ fontSize:13, color:"#7a6f64", lineHeight:1.6 }}>
              Freestyle — you pick which categories to include, how many questions from each, and the full question number range. No restrictions.
            </div>
          </div>

          <button onClick={onClose} style={{ padding:"10px", borderRadius:9, cursor:"pointer", background:"#f0ebe3", border:"1px solid #e2d9cf", color:"#a89c92", fontFamily:"'Cinzel',serif", fontSize:12 }}>Cancel</button>
        </div>
      </div>
    </div>
  );

  // ── Step 2: Official config ──
  if (mode === "official") return (
    <div style={{ position:"fixed", inset:0, zIndex:3000, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"Inter,system-ui,sans-serif", overflowY:"auto" }}>
      <div style={{ background:"#fffefb", border:"1px solid #d4c9bc", borderRadius:20, width:"100%", maxWidth:540, boxShadow:"0 8px 30px rgba(0,0,0,0.12)", overflow:"hidden" }}>
        <div style={{ padding:"18px 24px 14px", borderBottom:"1px solid #e2d9cf", display:"flex", alignItems:"center", gap:10 }}>
          <button onClick={() => { setMode(null); setError(""); }} style={{ padding:"5px 12px", borderRadius:7, border:"1px solid #d4c9bc", background:"#f0ebe3", color:"#7a6f64", cursor:"pointer", fontFamily:"'Cinzel',serif", fontSize:11 }}>← Back</button>
          <div style={{ flex:1, fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:"#7c3aed", letterSpacing:"0.04em" }}>📋 Official Practice Set</div>
          <button onClick={onClose} style={{ width:28, height:28, borderRadius:7, border:"1px solid #d4c9bc", background:"#f0ebe3", color:"#7a6f64", cursor:"pointer", fontSize:14 }}>✕</button>
        </div>
        <div style={{ padding:"18px 24px", display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ fontSize:13, color:"#7a6f64", textAlign:"center" }}>10 × 10pt · 7 × 20pt · 3 × 30pt = 20 questions. Adjust the ranges below.</div>

          {CAT.map(({ pts, color, bg, border, label, offPick }) => {
            const avail = offPools[pts].length;
            const ok    = avail >= offPick;
            const cr    = CATEGORY_RANGES[pts];
            return (
              <div key={pts} style={{ background: bg, border:`1px solid ${border}`, borderRadius:12, padding:"14px 16px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                  <div>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, fontWeight:700, color, letterSpacing:"0.04em" }}>{label} Questions</div>
                    <div style={{ fontSize:12, color:color, marginTop:1 }}>Pick {offPick} · Q#{cr.min}–{cr.max}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:16, fontWeight:700, color: ok?"#4ade80":"#f87171" }}>{avail}</div>
                    <div style={{ fontSize:12, fontWeight:700, color: ok?"#16a34a":"#dc2626" }}>{ok?`✓ enough`:`✗ need ${offPick}`}</div>
                  </div>
                </div>
                {pts === 30 ? (
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:"#dc2626", textAlign:"center", marginBottom:4 }}>Official range: Q#453–467</div>
                    {[["Lo", 0], ["Hi", 1]].map(([lbl, idx]) => (
                      <div key={lbl} style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontSize:12, fontWeight:700, color:color, width:22 }}>{lbl}</span>
                        <input type="range" min={453} max={467} value={Math.min(Math.max(ranges[pts][idx], 453), 467)}
                          onChange={e => {
                            const v = +e.target.value;
                            setRange(pts, idx === 0 ? [Math.min(v, Math.min(Math.max(ranges[pts][1],453),467)-1), ranges[pts][1]] : [ranges[pts][0], Math.max(v, Math.max(ranges[pts][0],453)+1)]);
                          }}
                          style={{ flex:1, accentColor:color }} />
                        <span style={{ fontFamily:"'Cinzel',serif", fontSize:13, fontWeight:700, color, width:40, textAlign:"right" }}>#{Math.min(Math.max(ranges[pts][idx],453),467)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {[["Lo", 0], ["Hi", 1]].map(([lbl, idx]) => (
                      <div key={lbl} style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontSize:12, fontWeight:700, color:color, width:22 }}>{lbl}</span>
                        <input type="range" min={cr.min} max={cr.max} value={ranges[pts][idx]}
                          onChange={e => {
                            const v = +e.target.value;
                            setRange(pts, idx === 0 ? [Math.min(v, ranges[pts][1]-1), ranges[pts][1]] : [ranges[pts][0], Math.max(v, ranges[pts][0]+1)]);
                          }}
                          style={{ flex:1, accentColor:color }} />
                        <span style={{ fontFamily:"'Cinzel',serif", fontSize:13, fontWeight:700, color, width:40, textAlign:"right" }}>#{ranges[pts][idx]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {error && <div style={{ background:"#fdf0f0", border:"1px solid #fecaca", borderRadius:9, padding:"10px 14px", fontSize:12, color:"#dc2626", whiteSpace:"pre-line" }}>{error}</div>}

          <div style={{ display:"flex", gap:10 }}>
            <button onClick={onClose} style={{ flex:1, padding:"11px", borderRadius:10, cursor:"pointer", background:"#f0ebe3", border:"1px solid #d4c9bc", color:"#4a3f35", fontFamily:"'Cinzel',serif", fontSize:12 }}>Cancel</button>
            <button onClick={generateOfficial} style={{ flex:2, padding:"11px", borderRadius:10, cursor: offCanGen?"pointer":"not-allowed", background: offCanGen?"linear-gradient(135deg,#7c3aed,#a855f7)":"rgba(255,255,255,0.04)", border: offCanGen?"none":"1px solid rgba(255,255,255,0.08)", color: offCanGen?"#fff":"#4a3020", fontFamily:"'Cinzel',serif", fontSize:13, fontWeight:700, letterSpacing:"0.06em", boxShadow: offCanGen?"0 4px 16px rgba(168,85,247,0.35)":"none" }}>
              ⚡ Generate Official Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Step 2: Custom / Non-official config ──
  return (
    <div style={{ position:"fixed", inset:0, zIndex:3000, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"Inter,system-ui,sans-serif", overflowY:"auto" }}>
      <div style={{ background:"#fffefb", border:"1px solid #d4c9bc", borderRadius:20, width:"100%", maxWidth:540, boxShadow:"0 8px 30px rgba(0,0,0,0.12)", overflow:"hidden" }}>
        <div style={{ padding:"18px 24px 14px", borderBottom:"1px solid #e2d9cf", display:"flex", alignItems:"center", gap:10 }}>
          <button onClick={() => { setMode(null); setError(""); }} style={{ padding:"5px 12px", borderRadius:7, border:"1px solid #d4c9bc", background:"#f0ebe3", color:"#7a6f64", cursor:"pointer", fontFamily:"'Cinzel',serif", fontSize:11 }}>← Back</button>
          <div style={{ flex:1, fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:"#9a4a10", letterSpacing:"0.04em" }}>🎲 Non-Official Practice Set</div>
          <button onClick={onClose} style={{ width:28, height:28, borderRadius:7, border:"1px solid #d4c9bc", background:"#f0ebe3", color:"#7a6f64", cursor:"pointer", fontSize:14 }}>✕</button>
        </div>
        <div style={{ padding:"18px 24px", display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ fontSize:13, color:"#7a6f64", textAlign:"center" }}>Enable categories, set how many questions to pick, and choose the range.</div>

          {CAT.map(({ pts, color, bg, border, label }) => {
            const enabled = custEnabled[pts];
            const count   = custCount[pts];
            const avail   = custPools[pts].length;
            const ok      = avail >= count;
            const cr      = CATEGORY_RANGES[pts];
            return (
              <div key={pts} style={{ background: enabled ? bg : "rgba(255,255,255,0.02)", border:`1px solid ${enabled ? border : "rgba(255,255,255,0.07)"}`, borderRadius:12, padding:"14px 16px", transition:"all .15s" }}>
                {/* Toggle + count */}
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom: enabled ? 12 : 0 }}>
                  <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", flex:1 }}>
                    <div onClick={() => setCustEnabled(e => ({ ...e, [pts]: !e[pts] }))}
                      style={{ width:38, height:22, borderRadius:11, background: enabled ? color : "rgba(255,255,255,0.1)", transition:"all .2s", position:"relative", flexShrink:0, cursor:"pointer" }}>
                      <div style={{ position:"absolute", top:3, left: enabled ? 18 : 3, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left .2s" }} />
                    </div>
                    <span style={{ fontFamily:"'Cinzel',serif", fontSize:12, fontWeight:700, color: enabled ? color : "#4a3020", letterSpacing:"0.04em" }}>{label} Questions</span>
                  </label>
                  {enabled && (
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <button onClick={() => setCustCount(c => ({ ...c, [pts]: Math.max(1, c[pts]-1) }))} style={{ width:24, height:24, borderRadius:6, border:`1px solid ${border}`, background:"#f7f3ee", color, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
                      <span style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, color, minWidth:28, textAlign:"center" }}>{count}</span>
                      <button onClick={() => setCustCount(c => ({ ...c, [pts]: Math.min(avail||99, c[pts]+1) }))} style={{ width:24, height:24, borderRadius:6, border:`1px solid ${border}`, background:"#f7f3ee", color, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
                      <span style={{ fontSize:12, fontWeight:700, color: ok?"#16a34a":"#dc2626", fontFamily:"'Cinzel',serif", marginLeft:4 }}>{avail} avail {ok?"✓":"✗"}</span>
                    </div>
                  )}
                </div>

                {/* Range sliders — only when enabled, no restrictions in custom mode */}
                {enabled && (
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {[["Lo", 0], ["Hi", 1]].map(([lbl, idx]) => (
                      <div key={lbl} style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontSize:12, fontWeight:700, color:color, width:22 }}>{lbl}</span>
                        <input type="range" min={cr.min} max={cr.max} value={ranges[pts][idx]}
                          onChange={e => {
                            const v = +e.target.value;
                            setRange(pts, idx === 0 ? [Math.min(v, ranges[pts][1]-1), ranges[pts][1]] : [ranges[pts][0], Math.max(v, ranges[pts][0]+1)]);
                          }}
                          style={{ flex:1, accentColor:color }} />
                        <span style={{ fontFamily:"'Cinzel',serif", fontSize:13, fontWeight:700, color, width:40, textAlign:"right" }}>#{ranges[pts][idx]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {error && <div style={{ background:"#fdf0f0", border:"1px solid #fecaca", borderRadius:9, padding:"10px 14px", fontSize:12, color:"#dc2626", whiteSpace:"pre-line" }}>{error}</div>}

          <div style={{ fontSize:12, color:"#a89c92", textAlign:"center" }}>
            Total questions: <span style={{ color:"#9a4a10", fontFamily:"'Cinzel',serif", fontWeight:700 }}>
              {[10,20,30].reduce((s,pts) => s + (custEnabled[pts] ? custCount[pts] : 0), 0)}
            </span>
          </div>

          <div style={{ display:"flex", gap:10 }}>
            <button onClick={onClose} style={{ flex:1, padding:"11px", borderRadius:10, cursor:"pointer", background:"#f0ebe3", border:"1px solid #d4c9bc", color:"#4a3f35", fontFamily:"'Cinzel',serif", fontSize:12 }}>Cancel</button>
            <button onClick={generateCustom} style={{ flex:2, padding:"11px", borderRadius:10, cursor: custCanGen?"pointer":"not-allowed", background: custCanGen?"linear-gradient(135deg,#b45309,#fbbf24)":"rgba(255,255,255,0.04)", border: custCanGen?"none":"1px solid rgba(255,255,255,0.08)", color: custCanGen?"#ffffff":"#9ca3af", fontFamily:"'Cinzel',serif", fontSize:13, fontWeight:700, letterSpacing:"0.06em", boxShadow: custCanGen?"0 4px 16px rgba(251,191,36,0.3)":"none" }}>
              🎲 Generate Custom Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const INIT_RANGES = {
  10:[CATEGORY_RANGES[10].min,CATEGORY_RANGES[10].max],
  20:[CATEGORY_RANGES[20].min,CATEGORY_RANGES[20].max],
  30:[CATEGORY_RANGES[30].min,CATEGORY_RANGES[30].max],
};

export default function App() {
  const [quizSet,          setQuizSet]          = useState(null);
  const [showCreateRound,  setShowCreateRound]  = useState(false);
  const [showBrowse,       setShowBrowse]       = useState(false);
  const [showPractice,     setShowPractice]     = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel="stylesheet";
    link.href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  },[]);

  return (
    <>
      {quizSet && (
        <QuizzingWindow questions={quizSet} onClose={()=>setQuizSet(null)} onRegenerate={()=>{ setQuizSet(null); setShowPractice(true); }} />
      )}
      {showCreateRound && (
        <CreateRound onClose={()=>setShowCreateRound(false)} />
      )}
      {showBrowse && (
        <BrowseQuestions onClose={()=>setShowBrowse(false)} />
      )}
      {showPractice && (
        <PracticeSetup onGenerate={(set)=>{ setShowPractice(false); setQuizSet(set); }} onClose={()=>setShowPractice(false)} />
      )}

      <div style={{ minHeight:"100vh", background:"#faf7f2", fontFamily:"Inter,system-ui,sans-serif", color:"#1c1410", display:"flex", flexDirection:"column" }}>

        {/* Header */}
        <div style={{ padding:"32px 28px 24px", textAlign:"center", borderBottom:"1px solid #e2d9cf" }}>
          <div style={{ fontSize:40, marginBottom:8 }}>📖</div>
          <h1 style={{ fontFamily:"'Cinzel',serif", fontSize:28, fontWeight:700, color:"#c26a14", margin:"0 0 6px", letterSpacing:"0.06em" }}>JBQ Quiz</h1>
          <p style={{ fontSize:14, color:"#7a6f64", margin:0, fontStyle:"italic" }}>Junior Bible Quiz · {ALL_QUESTIONS.length} questions</p>
        </div>

        {/* Three cards */}
        <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 24px" }}>
          <div className="home-cards" style={{ display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center", maxWidth:860, width:"100%" }}>

            {/* Create a Round */}
            <div onClick={()=>setShowCreateRound(true)}
              className="home-card" style={{ flex:"1 1 220px", maxWidth:260, background:"#edfaf2", border:"1px solid #bbf7d0", borderRadius:18, padding:"32px 24px", cursor:"pointer", textAlign:"center", transition:"all .18s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(16,185,129,0.14)";e.currentTarget.style.borderColor="rgba(16,185,129,0.45)";e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(16,185,129,0.07)";e.currentTarget.style.borderColor="rgba(16,185,129,0.25)";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{ fontSize:44, marginBottom:14 }}>🏆</div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:16, fontWeight:700, color:"#059669", marginBottom:10, letterSpacing:"0.04em" }}>Create a Round</div>
              <div style={{ fontSize:13, color:"#7a6f64", lineHeight:1.6 }}>Set up two teams, assign quizzers, and run a full scored match with fouls, timeouts, and substitutions.</div>
            </div>

            {/* Practice Set */}
            <div onClick={()=>setShowPractice(true)}
              className="home-card" style={{ flex:"1 1 220px", maxWidth:260, background:"#f5f0fc", border:"1px solid #ddd6fe", borderRadius:18, padding:"32px 24px", cursor:"pointer", textAlign:"center", transition:"all .18s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(124,58,237,0.14)";e.currentTarget.style.borderColor="rgba(124,58,237,0.45)";e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(124,58,237,0.07)";e.currentTarget.style.borderColor="rgba(124,58,237,0.25)";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{ fontSize:44, marginBottom:14 }}>⚡</div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:16, fontWeight:700, color:"#7c3aed", marginBottom:10, letterSpacing:"0.04em" }}>Practice Set</div>
              <div style={{ fontSize:13, color:"#7a6f64", lineHeight:1.6 }}>Generate a 20-question practice set — 10 × 10pt, 7 × 20pt, 3 × 30pt — randomly selected.</div>
            </div>

            {/* Browse */}
            <div onClick={()=>setShowBrowse(true)}
              className="home-card" style={{ flex:"1 1 220px", maxWidth:260, background:"#fdf6e8", border:"1px solid #fde68a", borderRadius:18, padding:"32px 24px", cursor:"pointer", textAlign:"center", transition:"all .18s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(200,134,10,0.14)";e.currentTarget.style.borderColor="rgba(200,134,10,0.45)";e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(200,134,10,0.07)";e.currentTarget.style.borderColor="rgba(200,134,10,0.22)";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{ fontSize:44, marginBottom:14 }}>📖</div>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:16, fontWeight:700, color:"#c26a14", marginBottom:10, letterSpacing:"0.04em" }}>Browse Questions</div>
              <div style={{ fontSize:13, color:"#7a6f64", lineHeight:1.6 }}>Search, filter, and study all {ALL_QUESTIONS.length} questions by category, range, or keyword.</div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
