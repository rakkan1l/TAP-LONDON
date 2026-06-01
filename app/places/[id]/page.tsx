"use client";

import React, { useState, useRef } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import places from "@/data/places.json";

type Props = { params: { id: string } };

const PLACE_HISTORY: Record<string, { founded: string; history: string; facts: string[] }> = {
  "tower-of-london": {
    founded: "Founded 1066 by William the Conqueror",
    history: "The Tower of London was built in the 1070s by William the Conqueror following his victory at the Battle of Hastings. He constructed the massive White Tower to defend and proclaim his royal power. Built from limestone imported from Caen in Normandy, it took nearly 20 years to complete. The Tower has served as a royal palace, political prison, place of execution, royal mint, menagerie, and arsenal. Its most famous prisoners include Anne Boleyn, Thomas More, and Lady Jane Grey. Today it houses the Crown Jewels.",
    facts: ["Built in the 1070s by William the Conqueror", "The White Tower took nearly 20 years to complete", "Stone was imported from Caen, Normandy, France", "Only 7 people were ever executed inside the Tower walls", "At least 6 ravens must live here by royal decree", "The Crown Jewels have been stored here since the 17th century", "2,817,852 visitors came in 2025", "Yeoman Warders (Beefeaters) have guarded it since the 15th century"],
  },
  "buckingham-palace": {
    founded: "Built 1703; became royal residence 1837",
    history: "Buckingham Palace began as Buckingham House, built in 1703 for the Duke of Buckingham. King George III purchased it in 1761. It was substantially remodelled by architect John Nash for King George IV from 1826. Queen Victoria was the first monarch to use it as the official royal London residence in 1837. The palace has 775 rooms, including 19 State Rooms and 78 bathrooms.",
    facts: ["Originally Buckingham House, built in 1703", "Queen Victoria was the first monarch to live here in 1837", "The palace has 775 rooms and 78 bathrooms", "The garden covers 39 acres — one of London's largest private gardens", "Around 50,000 people visit as guests each year", "The Changing of the Guard has taken place here since 1660"],
  },
  "big-ben": {
    founded: "Clock tower completed 1858; renamed Elizabeth Tower 2012",
    history: "The Elizabeth Tower was completed in 1858 as part of the rebuilt Palace of Westminster. 'Big Ben' technically refers only to the largest bell inside, which weighs 13.7 tonnes. Renamed the Elizabeth Tower in 2012 to mark Queen Elizabeth II's Diamond Jubilee. The clock was silent from 2017 to 2022 during £79 million restoration works.",
    facts: ["Big Ben is the name of the bell, not the tower", "The main bell weighs 13.7 tonnes", "Clock faces are 7 metres in diameter", "Renamed Elizabeth Tower in 2012", "Restored between 2017 and 2022 for £79 million", "Coins under the pendulum can adjust the clock speed"],
  },
  "british-museum": {
    founded: "Founded 1753; opened to public 1759",
    history: "The British Museum was founded in 1753, making it the world's first public national museum. The current building was designed by Sir Robert Smirke between 1823 and 1852. The Great Court, designed by Sir Norman Foster, opened in 2000 and is the largest covered public square in Europe.",
    facts: ["World's first public national museum, founded 1753", "Over 8 million objects in the collection", "The Rosetta Stone has been on display since 1802", "Karl Marx researched Das Kapital in the Reading Room", "The Great Court is Europe's largest covered public square", "Around 6 million visitors per year", "Admission has been free since 2001"],
  },
  "natural-history-museum": {
    founded: "Opened 1881",
    history: "The Natural History Museum opened on 18 April 1881. The magnificent Romanesque building was designed by Alfred Waterhouse. Its centrepiece is the grand Central Hall dominated by the famous blue whale skeleton 'Hope'. The collections include over 80 million specimens spanning billions of years.",
    facts: ["Collections span 4.5 billion years of Earth's history", "Over 80 million specimens in the collection", "The blue whale skeleton 'Hope' replaced Dippy the diplodocus in 2017", "Charles Darwin's collection forms part of the archives", "Around 5 million visitors per year", "Free admission for all"],
  },
  "st-pauls-cathedral": {
    founded: "Current building completed 1710; originally 604 AD",
    history: "The first St Paul's Cathedral was founded in 604 AD. The medieval cathedral was destroyed in the Great Fire of London in 1666. Sir Christopher Wren designed the current Baroque masterpiece, built between 1675 and 1710. Its dome at 111 metres dominated the London skyline for 250 years.",
    facts: ["First cathedral on this site dates to 604 AD", "Destroyed in the Great Fire of London in 1666", "Designed by Sir Christopher Wren", "The dome stands 111 metres tall", "Winston Churchill's funeral was held here in 1965", "Prince Charles and Lady Diana married here in 1981"],
  },
  "tower-bridge": {
    founded: "Built 1886-1894; opened 30 June 1894",
    history: "Tower Bridge was built between 1886 and 1894, opened by the Prince of Wales on 30 June 1894. Its Gothic Revival towers were designed to complement the nearby Tower of London. Originally powered by steam hydraulics, converted to electricity in 1976. The bridge opens around 800-900 times per year.",
    facts: ["Built between 1886 and 1894 — took 8 years", "Over 11,000 tonnes of steel in the skeleton", "Originally powered by steam hydraulics", "The bascules rise to 86 degrees in 5 minutes", "Glass floor panels installed in 2014", "A motorcyclist jumped the partly open bridge in 1952"],
  },
  "national-gallery": {
    founded: "Founded 1824; moved to Trafalgar Square 1838",
    history: "The National Gallery was founded in 1824 when the government purchased 38 paintings. It moved to Trafalgar Square in 1838. It now holds over 2,300 paintings spanning 700 years of European art from 1250 to 1900.",
    facts: ["Founded in 1824 with just 38 paintings", "Over 2,300 paintings in the collection", "Covers Western European art from 1250 to 1900", "Van Gogh's Sunflowers is one of the most visited paintings", "Free admission since founding in 1824", "Around 6 million visitors per year"],
  },
  "hyde-park": {
    founded: "Royal park since 1536; opened to public in 17th century",
    history: "Hyde Park was seized by Henry VIII from Westminster Abbey in 1536. The Great Exhibition of 1851 was held here in the Crystal Palace. The Serpentine lake was created in 1730 by Queen Caroline. Hyde Park has hosted massive free concerts and historic events.",
    facts: ["Seized by Henry VIII from Westminster Abbey in 1536", "Covers 350 acres", "The Serpentine lake was created in 1730", "The Great Exhibition of 1851 attracted 6 million visitors", "Speakers' Corner has been a free speech site since 1872", "The Rolling Stones performed for 500,000 people here in 1969"],
  },
  "tate-modern": {
    founded: "Opened 11 May 2000 in converted Bankside Power Station",
    history: "Tate Modern opened in 2000 in the converted Bankside Power Station. Swiss architects Herzog & de Meuron won the conversion competition. The Turbine Hall — 155 metres long — hosts major art installations. The Blavatnik Building extension opened in 2016.",
    facts: ["Opened 11 May 2000", "The Turbine Hall is 155 metres long and 35 metres tall", "Around 6 million visitors per year", "Collection includes Picasso, Dalí, Warhol, and Rothko", "Admission to permanent collection is free", "Connected to St Paul's by the Millennium Bridge"],
  },
  "kew-gardens": {
    founded: "Founded 1759; UNESCO World Heritage Site 2003",
    history: "The Royal Botanic Gardens, Kew, were founded in 1759 by Princess Augusta, mother of King George III. The iconic Palm House was built 1844-48. In 2003, Kew Gardens was designated a UNESCO World Heritage Site. Today it holds over 50,000 plant species.",
    facts: ["Founded in 1759 by Princess Augusta", "UNESCO World Heritage Site since 2003", "Over 50,000 plant species", "The Treetop Walkway rises 18 metres above the forest floor", "The Great Pagoda was built in 1762", "Covers 132 hectares (326 acres)"],
  },
};

// Multiple photos for ALL places across ALL categories
const PLACE_PHOTOS: Record<string, string[]> = {
  // Top Attractions
  "tower-of-london": ["https://images.pexels.com/photos/1055234/pexels-photo-1055234.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/726484/pexels-photo-726484.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "buckingham-palace": ["https://images.pexels.com/photos/29191806/pexels-photo-29191806.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/13020613/pexels-photo-13020613.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "big-ben": ["https://images.pexels.com/photos/29253512/pexels-photo-29253512.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "london-eye": ["https://images.pexels.com/photos/10548993/pexels-photo-10548993.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/29014277/pexels-photo-29014277.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "tower-bridge": ["https://images.pexels.com/photos/26624348/pexels-photo-26624348.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "st-pauls-cathedral": ["https://images.pexels.com/photos/29014277/pexels-photo-29014277.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/35973696/pexels-photo-35973696.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "trafalgar-square": ["https://images.pexels.com/photos/12900444/pexels-photo-12900444.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "houses-of-parliament": ["https://images.pexels.com/photos/5209876/pexels-photo-5209876.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/29253512/pexels-photo-29253512.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "national-gallery": ["https://images.pexels.com/photos/2269593/pexels-photo-2269593.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/568414/pexels-photo-568414.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "british-museum": ["https://images.pexels.com/photos/135018/pexels-photo-135018.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/2269593/pexels-photo-2269593.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "victoria-albert-museum": ["https://images.pexels.com/photos/568414/pexels-photo-568414.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/2269593/pexels-photo-2269593.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "natural-history-museum": ["https://images.pexels.com/photos/30397052/pexels-photo-30397052.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/3308285/pexels-photo-3308285.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "tate-modern": ["https://images.pexels.com/photos/6398533/pexels-photo-6398533.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/35973696/pexels-photo-35973696.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "greenwich-observatory": ["https://images.pexels.com/photos/33806770/pexels-photo-33806770.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "kew-gardens": ["https://images.pexels.com/photos/15046186/pexels-photo-15046186.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "hampton-court-palace": ["https://images.pexels.com/photos/17189048/pexels-photo-17189048.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/13020613/pexels-photo-13020613.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/15301981/pexels-photo-15301981.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "windsor-castle": ["https://images.pexels.com/photos/13020613/pexels-photo-13020613.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/17189048/pexels-photo-17189048.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "hyde-park": ["https://images.pexels.com/photos/15301981/pexels-photo-15301981.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "regents-park": ["https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/15301981/pexels-photo-15301981.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "covent-garden": ["https://images.pexels.com/photos/36680841/pexels-photo-36680841.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800"],
  // Hidden Gems
  "leadenhall-market": ["https://images.pexels.com/photos/20424060/pexels-photo-20424060.png?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "kyoto-garden": ["https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "little-venice": ["https://images.pexels.com/photos/33794525/pexels-photo-33794525.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "columbia-road": ["https://images.pexels.com/photos/31270596/pexels-photo-31270596.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "st-dunstan": ["https://images.pexels.com/photos/1834407/pexels-photo-1834407.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/29014277/pexels-photo-29014277.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "leake-street": ["https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "neals-yard": ["https://images.pexels.com/photos/1534057/pexels-photo-1534057.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/36680841/pexels-photo-36680841.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "bermondsey-street": ["https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "postmans-park": ["https://images.pexels.com/photos/1834407/pexels-photo-1834407.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "gods-own-junkyard": ["https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "pergola-hill-garden": ["https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/15301981/pexels-photo-15301981.jpeg?auto=compress&cs=tinysrgb&w=800"],
  // Photo Spots
  "millennium-bridge": ["https://images.pexels.com/photos/35973696/pexels-photo-35973696.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/29014277/pexels-photo-29014277.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "primrose-hill": ["https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "sky-garden": ["https://images.pexels.com/photos/34284059/pexels-photo-34284059.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "southbank-night": ["https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/35973696/pexels-photo-35973696.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/29014277/pexels-photo-29014277.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "alexandra-palace": ["https://images.pexels.com/photos/6170366/pexels-photo-6170366.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "greenwich-park-hill": ["https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "borough-market-archway": ["https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/31270596/pexels-photo-31270596.jpeg?auto=compress&cs=tinysrgb&w=800"],
  // Free Things
  "science-museum": ["https://images.pexels.com/photos/30397052/pexels-photo-30397052.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/3308285/pexels-photo-3308285.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "thames-path": ["https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/35973696/pexels-photo-35973696.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "changing-guard": ["https://images.pexels.com/photos/29191806/pexels-photo-29191806.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/13020613/pexels-photo-13020613.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "vam-free": ["https://images.pexels.com/photos/568414/pexels-photo-568414.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/2269593/pexels-photo-2269593.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "sky-garden-free": ["https://images.pexels.com/photos/34284059/pexels-photo-34284059.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800"],
  "regents-canal-walk": ["https://images.pexels.com/photos/33794525/pexels-photo-33794525.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/13528203/pexels-photo-13528203.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800"],
};

function PhotoGallery({ photos, name }: { photos: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ marginBottom: "24px" }}>
      {/* Main photo */}
      <div style={{
        borderRadius: "16px", overflow: "hidden",
        width: "100%", aspectRatio: "4/3",
        position: "relative", background: "#1a1a2e",
        marginBottom: "10px",
      }}>
        <img
          key={active}
          src={photos[active]}
          alt={`${name} ${active + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
        {/* Arrows */}
        {active > 0 && (
          <button onClick={() => setActive(active - 1)} style={{
            position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.55)", border: "none", color: "#fff",
            width: "38px", height: "38px", borderRadius: "50%",
            fontSize: "1.3rem", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 2,
          }}>‹</button>
        )}
        {active < photos.length - 1 && (
          <button onClick={() => setActive(active + 1)} style={{
            position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.55)", border: "none", color: "#fff",
            width: "38px", height: "38px", borderRadius: "50%",
            fontSize: "1.3rem", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 2,
          }}>›</button>
        )}
        {/* Counter */}
        <div style={{
          position: "absolute", bottom: "10px", right: "12px",
          background: "rgba(0,0,0,0.6)", color: "#fff",
          borderRadius: "20px", padding: "3px 10px",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600,
        }}>
          {active + 1} / {photos.length}
        </div>
      </div>

      {/* Thumbnails — native scroll on mobile */}
      {photos.length > 1 && (
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            overflowY: "hidden",
            paddingBottom: "6px",
            cursor: "grab",
          }}
        >
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                flexShrink: 0,
                width: "80px",
                height: "60px",
                borderRadius: "8px",
                overflow: "hidden",
                padding: 0,
                border: i === active ? "2.5px solid #c9a84c" : "2.5px solid rgba(0,0,0,0.1)",
                cursor: "pointer",
                opacity: i === active ? 1 : 0.6,
                transition: "opacity 0.2s, border-color 0.2s",
              }}
            >
              <img
                src={photo}
                alt={`${name} ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PlaceDetailPage({ params }: Props) {
  const place = places.items.find((p) => p.id === params.id);
  if (!place) notFound();

  const history = PLACE_HISTORY[place.id];
  const photos = PLACE_PHOTOS[place.id] ?? [place.image];

  return (
    <main style={{ minHeight: "100vh" }} className="bg-[#f9f7f2] dark:bg-[#0d0d1a]">

      {/* Hero */}
      <div style={{ position: "relative", height: "44vh", minHeight: "250px", overflow: "hidden" }}>
        <img src={photos[0]} alt={place.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(26,26,46,0.88) 100%)" }} />
        <Link href="/places" style={{
          position: "absolute", top: "16px", left: "16px",
          background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff",
          borderRadius: "50px", padding: "7px 16px",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem",
          fontWeight: 600, textDecoration: "none",
        }}>
          ← Back
        </Link>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px 20px" }}>
          <div style={{
            display: "inline-block", background: "rgba(201,168,76,0.2)",
            border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c",
            borderRadius: "50px", padding: "3px 12px", fontSize: "0.7rem",
            fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" as const,
            marginBottom: "6px", fontFamily: "'DM Sans', sans-serif",
          }}>
            {place.category}
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.7rem, 5.5vw, 2.8rem)",
            fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: "0 0 4px 0",
          }}>
            {place.icon} {place.name}
          </h1>
          {history && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(201,168,76,0.85)", margin: 0 }}>
              🏛️ {history.founded}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 16px 60px" }}>

        {/* Photo Gallery */}
        <PhotoGallery photos={photos} name={place.name} />

        {/* Quick Info */}
        <div style={{
          background: "#ffffff", borderRadius: "16px", padding: "18px 20px",
          marginBottom: "18px", border: "1px solid rgba(26,26,46,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          display: "flex", flexDirection: "column", gap: "12px",
        }}>
          {place.area && (
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>📍</span>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#888", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>Area</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "var(--card-title, #1a1a2e)", fontWeight: 600 }}>{place.area}</div>
              </div>
            </div>
          )}
          {place.openingHours && (
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>🕐</span>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#888", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>Opening Hours</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "var(--card-title, #1a1a2e)", fontWeight: 600, lineHeight: 1.4 }}>{place.openingHours}</div>
              </div>
            </div>
          )}
          {place.entryFee && (
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>{place.priceType === "Free" ? "🎁" : "💷"}</span>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#888", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>Entry</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "var(--card-title, #1a1a2e)", fontWeight: 600 }}>{place.entryFee}</div>
              </div>
            </div>
          )}
        </div>

        {/* About */}
        <div style={{ background: "var(--tw-white, #ffffff)", borderRadius: "16px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(26,26,46,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px", marginTop: 0 }}>About {place.name}</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "var(--text-body, #444)", lineHeight: 1.8, margin: 0 }}>{place.description}</p>
        </div>

        {/* History */}
        {history && (
          <div style={{ background: "#1a1a2e", borderRadius: "16px", padding: "20px", marginBottom: "18px" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#c9a84c", marginBottom: "10px", marginTop: 0 }}>📜 History</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, margin: 0 }}>{history.history}</p>
          </div>
        )}

        {/* Facts */}
        {history && (
          <div style={{ background: "var(--tw-white, #ffffff)", borderRadius: "16px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(26,26,46,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "14px", marginTop: 0 }}>⭐ Fascinating Facts</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {history.facts.map((fact, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(201,168,76,0.15)", color: "#c9a84c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 700, flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>{i + 1}</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "var(--text-body, #444)", lineHeight: 1.6, margin: 0 }}>{fact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div style={{ background: "rgba(201,168,76,0.08)", borderRadius: "16px", padding: "20px", marginBottom: "18px", border: "1px solid rgba(201,168,76,0.2)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px", marginTop: 0 }}>💡 Visitor Tips</h2>
          {["Book tickets online in advance to skip the queue", "Visit on weekday mornings for smaller crowds", "Check the official website for seasonal opening changes", "Nearest tube station is usually a short walk away"].map((tip, i) => (
            <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "var(--text-body, #555)", lineHeight: 1.6, margin: "0 0 6px 0", display: "flex", gap: "8px" }}>
              <span style={{ color: "#c9a84c", fontWeight: 700 }}>✓</span> {tip}
            </p>
          ))}
        </div>

        {/* Directions */}
        {place.mapsUrl && (
          <a href={place.mapsUrl} target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "8px", width: "100%", background: "#1a1a2e", color: "#c9a84c",
            padding: "15px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.95rem", fontWeight: 700, textDecoration: "none",
            marginBottom: "12px", boxSizing: "border-box" as const,
          }}>
            📍 Get Directions on Google Maps
          </a>
        )}

        <Link href="/places" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "8px", width: "100%", background: "transparent", color: "#1a1a2e",
          padding: "13px", borderRadius: "50px", border: "2px solid #1a1a2e",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
          fontWeight: 600, textDecoration: "none", boxSizing: "border-box" as const,
        }}>
          ← Back to All Places
        </Link>

      </div>
    </main>
  );
}
