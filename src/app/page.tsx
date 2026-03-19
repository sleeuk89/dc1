'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

// ============================================================================
// LOCATION DATA - All UK Counties and Towns
// ============================================================================

const locationData = [
  {
    county: "Greater London",
    slug: "greater-london",
    towns: [
      { name: "Woolwich", slug: "woolwich", postcode: "SE18" },
      { name: "Croydon", slug: "croydon", postcode: "CR0" },
      { name: "Hackney", slug: "hackney", postcode: "E8" },
      { name: "Brixton", slug: "brixton", postcode: "SW2" },
      { name: "Lewisham", slug: "lewisham", postcode: "SE13" },
      { name: "Stratford", slug: "stratford", postcode: "E15" },
      { name: "Camden", slug: "camden", postcode: "NW1" },
      { name: "Richmond", slug: "richmond", postcode: "TW9" }
    ]
  },
  {
    county: "Greater Manchester",
    slug: "greater-manchester",
    towns: [
      { name: "Manchester", slug: "manchester", postcode: "M1" },
      { name: "Salford", slug: "salford", postcode: "M5" },
      { name: "Bolton", slug: "bolton", postcode: "BL1" },
      { name: "Oldham", slug: "oldham", postcode: "OL1" },
      { name: "Stockport", slug: "stockport", postcode: "SK1" },
      { name: "Wigan", slug: "wigan", postcode: "WN1" },
      { name: "Trafford", slug: "trafford", postcode: "M32" }
    ]
  },
  {
    county: "West Yorkshire",
    slug: "west-yorkshire",
    towns: [
      { name: "Leeds", slug: "leeds", postcode: "LS1" },
      { name: "Bradford", slug: "bradford", postcode: "BD1" },
      { name: "Wakefield", slug: "wakefield", postcode: "WF1" },
      { name: "Huddersfield", slug: "huddersfield", postcode: "HD1" },
      { name: "Halifax", slug: "halifax", postcode: "HX1" },
      { name: "Dewsbury", slug: "dewsbury", postcode: "WF12" }
    ]
  },
  {
    county: "West Midlands",
    slug: "west-midlands",
    towns: [
      { name: "Birmingham", slug: "birmingham", postcode: "B1" },
      { name: "Coventry", slug: "coventry", postcode: "CV1" },
      { name: "Wolverhampton", slug: "wolverhampton", postcode: "WV1" },
      { name: "Solihull", slug: "solihull", postcode: "B91" },
      { name: "Sutton Coldfield", slug: "sutton-coldfield", postcode: "B72" },
      { name: "Walsall", slug: "walsall", postcode: "WS1" }
    ]
  },
  {
    county: "Merseyside",
    slug: "merseyside",
    towns: [
      { name: "Liverpool", slug: "liverpool", postcode: "L1" },
      { name: "Birkenhead", slug: "birkenhead", postcode: "CH41" },
      { name: "St Helens", slug: "st-helens", postcode: "WA10" },
      { name: "Southport", slug: "southport", postcode: "PR8" },
      { name: "Wirral", slug: "wirral", postcode: "CH62" },
      { name: "Bootle", slug: "bootle", postcode: "L20" }
    ]
  },
  {
    county: "South Yorkshire",
    slug: "south-yorkshire",
    towns: [
      { name: "Sheffield", slug: "sheffield", postcode: "S1" },
      { name: "Rotherham", slug: "rotherham", postcode: "S60" },
      { name: "Doncaster", slug: "doncaster", postcode: "DN1" },
      { name: "Barnsley", slug: "barnsley", postcode: "S70" },
      { name: "Mexborough", slug: "mexborough", postcode: "S64" }
    ]
  },
  {
    county: "Tyne and Wear",
    slug: "tyne-and-wear",
    towns: [
      { name: "Newcastle upon Tyne", slug: "newcastle-upon-tyne", postcode: "NE1" },
      { name: "Sunderland", slug: "sunderland", postcode: "SR1" },
      { name: "Gateshead", slug: "gateshead", postcode: "NE8" },
      { name: "South Shields", slug: "south-shields", postcode: "NE33" },
      { name: "Washington", slug: "washington", postcode: "NE37" }
    ]
  },
  {
    county: "Kent",
    slug: "kent",
    towns: [
      { name: "Maidstone", slug: "maidstone", postcode: "ME14" },
      { name: "Canterbury", slug: "canterbury", postcode: "CT1" },
      { name: "Dover", slug: "dover", postcode: "CT16" },
      { name: "Tunbridge Wells", slug: "tunbridge-wells", postcode: "TN1" },
      { name: "Ashford", slug: "ashford", postcode: "TN23" },
      { name: "Gravesend", slug: "gravesend", postcode: "DA11" }
    ]
  },
  {
    county: "Essex",
    slug: "essex",
    towns: [
      { name: "Chelmsford", slug: "chelmsford", postcode: "CM1" },
      { name: "Colchester", slug: "colchester", postcode: "CO1" },
      { name: "Southend-on-Sea", slug: "southend-on-sea", postcode: "SS0" },
      { name: "Basildon", slug: "basildon", postcode: "SS14" },
      { name: "Harlow", slug: "harlow", postcode: "CM20" },
      { name: "Brentwood", slug: "brentwood", postcode: "CM13" }
    ]
  },
  {
    county: "Hampshire",
    slug: "hampshire",
    towns: [
      { name: "Southampton", slug: "southampton", postcode: "SO14" },
      { name: "Portsmouth", slug: "portsmouth", postcode: "PO1" },
      { name: "Winchester", slug: "winchester", postcode: "SO23" },
      { name: "Basingstoke", slug: "basingstoke", postcode: "RG21" },
      { name: "Fareham", slug: "fareham", postcode: "PO16" },
      { name: "Andover", slug: "andover", postcode: "SP10" }
    ]
  },
  {
    county: "Lancashire",
    slug: "lancashire",
    towns: [
      { name: "Preston", slug: "preston", postcode: "PR1" },
      { name: "Blackburn", slug: "blackburn", postcode: "BB1" },
      { name: "Burnley", slug: "burnley", postcode: "BB11" },
      { name: "Lancaster", slug: "lancaster", postcode: "LA1" },
      { name: "Blackpool", slug: "blackpool", postcode: "FY1" },
      { name: "Chorley", slug: "chorley", postcode: "PR7" }
    ]
  },
  {
    county: "Surrey",
    slug: "surrey",
    towns: [
      { name: "Guildford", slug: "guildford", postcode: "GU1" },
      { name: "Woking", slug: "woking", postcode: "GU21" },
      { name: "Epsom", slug: "epsom", postcode: "KT17" },
      { name: "Farnham", slug: "farnham", postcode: "GU9" },
      { name: "Redhill", slug: "redhill", postcode: "RH1" },
      { name: "Staines", slug: "staines", postcode: "TW18" }
    ]
  },
  {
    county: "Hertfordshire",
    slug: "hertfordshire",
    towns: [
      { name: "St Albans", slug: "st-albans", postcode: "AL1" },
      { name: "Watford", slug: "watford", postcode: "WD17" },
      { name: "Hemel Hempstead", slug: "hemel-hempstead", postcode: "HP1" },
      { name: "Stevenage", slug: "stevenage", postcode: "SG1" },
      { name: "Hitchin", slug: "hitchin", postcode: "SG5" },
      { name: "Hatfield", slug: "hatfield", postcode: "AL10" }
    ]
  },
  {
    county: "Nottinghamshire",
    slug: "nottinghamshire",
    towns: [
      { name: "Nottingham", slug: "nottingham", postcode: "NG1" },
      { name: "Mansfield", slug: "mansfield", postcode: "NG18" },
      { name: "Worksop", slug: "worksop", postcode: "S80" },
      { name: "Newark-on-Trent", slug: "newark-on-trent", postcode: "NG24" },
      { name: "Retford", slug: "retford", postcode: "DN22" }
    ]
  },
  {
    county: "Derbyshire",
    slug: "derbyshire",
    towns: [
      { name: "Derby", slug: "derby", postcode: "DE1" },
      { name: "Chesterfield", slug: "chesterfield", postcode: "S40" },
      { name: "Ilkeston", slug: "ilkeston", postcode: "DE7" },
      { name: "Long Eaton", slug: "long-eaton", postcode: "NG10" },
      { name: "Buxton", slug: "buxton", postcode: "SK17" }
    ]
  },
  {
    county: "Leicestershire",
    slug: "leicestershire",
    towns: [
      { name: "Leicester", slug: "leicester", postcode: "LE1" },
      { name: "Loughborough", slug: "loughborough", postcode: "LE11" },
      { name: "Hinckley", slug: "hinckley", postcode: "LE10" },
      { name: "Coalville", slug: "coalville", postcode: "LE67" },
      { name: "Melton Mowbray", slug: "melton-mowbray", postcode: "LE13" }
    ]
  },
  {
    county: "Staffordshire",
    slug: "staffordshire",
    towns: [
      { name: "Stoke-on-Trent", slug: "stoke-on-trent", postcode: "ST1" },
      { name: "Stafford", slug: "stafford", postcode: "ST16" },
      { name: "Lichfield", slug: "lichfield", postcode: "WS13" },
      { name: "Tamworth", slug: "tamworth", postcode: "B77" },
      { name: "Burton upon Trent", slug: "burton-upon-trent", postcode: "DE14" }
    ]
  },
  {
    county: "Somerset",
    slug: "somerset",
    towns: [
      { name: "Taunton", slug: "taunton", postcode: "TA1" },
      { name: "Bath", slug: "bath", postcode: "BA1" },
      { name: "Yeovil", slug: "yeovil", postcode: "BA20" },
      { name: "Bridgwater", slug: "bridgwater", postcode: "TA6" },
      { name: "Weston-super-Mare", slug: "weston-super-mare", postcode: "BS23" }
    ]
  },
  {
    county: "Norfolk",
    slug: "norfolk",
    towns: [
      { name: "Norwich", slug: "norwich", postcode: "NR1" },
      { name: "Great Yarmouth", slug: "great-yarmouth", postcode: "NR30" },
      { name: "King's Lynn", slug: "kings-lynn", postcode: "PE30" },
      { name: "Thetford", slug: "thetford", postcode: "IP24" },
      { name: "Cromer", slug: "cromer", postcode: "NR27" }
    ]
  },
  {
    county: "Suffolk",
    slug: "suffolk",
    towns: [
      { name: "Ipswich", slug: "ipswich", postcode: "IP1" },
      { name: "Bury St Edmunds", slug: "bury-st-edmunds", postcode: "IP33" },
      { name: "Lowestoft", slug: "lowestoft", postcode: "NR32" },
      { name: "Felixstowe", slug: "felixstowe", postcode: "IP11" },
      { name: "Newmarket", slug: "newmarket", postcode: "CB8" }
    ]
  },
  {
    county: "Northamptonshire",
    slug: "northamptonshire",
    towns: [
      { name: "Northampton", slug: "northampton", postcode: "NN1" },
      { name: "Kettering", slug: "kettering", postcode: "NN16" },
      { name: "Corby", slug: "corby", postcode: "NN17" },
      { name: "Wellingborough", slug: "wellingborough", postcode: "NN8" },
      { name: "Daventry", slug: "daventry", postcode: "NN11" }
    ]
  },
  {
    county: "Cambridgeshire",
    slug: "cambridgeshire",
    towns: [
      { name: "Cambridge", slug: "cambridge", postcode: "CB1" },
      { name: "Peterborough", slug: "peterborough", postcode: "PE1" },
      { name: "Huntingdon", slug: "huntingdon", postcode: "PE29" },
      { name: "Wisbech", slug: "wisbech", postcode: "PE13" },
      { name: "March", slug: "march", postcode: "PE15" }
    ]
  },
  {
    county: "Oxfordshire",
    slug: "oxfordshire",
    towns: [
      { name: "Oxford", slug: "oxford", postcode: "OX1" },
      { name: "Banbury", slug: "banbury", postcode: "OX16" },
      { name: "Abingdon", slug: "abingdon", postcode: "OX14" },
      { name: "Didcot", slug: "didcot", postcode: "OX11" },
      { name: "Witney", slug: "witney", postcode: "OX28" }
    ]
  },
  {
    county: "Berkshire",
    slug: "berkshire",
    towns: [
      { name: "Reading", slug: "reading", postcode: "RG1" },
      { name: "Slough", slug: "slough", postcode: "SL1" },
      { name: "Maidenhead", slug: "maidenhead", postcode: "SL6" },
      { name: "Bracknell", slug: "bracknell", postcode: "RG12" },
      { name: "Windsor", slug: "windsor", postcode: "SL4" },
      { name: "Newbury", slug: "newbury", postcode: "RG14" }
    ]
  },
  {
    county: "Bristol",
    slug: "bristol",
    towns: [
      { name: "Bristol City Centre", slug: "bristol-city-centre", postcode: "BS1" },
      { name: "Clifton", slug: "clifton", postcode: "BS8" },
      { name: "Bedminster", slug: "bedminster", postcode: "BS3" },
      { name: "Kingswood", slug: "kingswood", postcode: "BS15" },
      { name: "Filton", slug: "filton", postcode: "BS34" }
    ]
  },
  {
    county: "Devon",
    slug: "devon",
    towns: [
      { name: "Exeter", slug: "exeter", postcode: "EX1" },
      { name: "Plymouth", slug: "plymouth", postcode: "PL1" },
      { name: "Torquay", slug: "torquay", postcode: "TQ1" },
      { name: "Barnstaple", slug: "barnstaple", postcode: "EX31" },
      { name: "Newton Abbot", slug: "newton-abbot", postcode: "TQ12" }
    ]
  },
  {
    county: "Cornwall",
    slug: "cornwall",
    towns: [
      { name: "Truro", slug: "truro", postcode: "TR1" },
      { name: "Falmouth", slug: "falmouth", postcode: "TR11" },
      { name: "Newquay", slug: "newquay", postcode: "TR7" },
      { name: "St Ives", slug: "st-ives", postcode: "TR26" },
      { name: "Penryn", slug: "penryn", postcode: "TR10" }
    ]
  },
  {
    county: "Cheshire",
    slug: "cheshire",
    towns: [
      { name: "Chester", slug: "chester", postcode: "CH1" },
      { name: "Warrington", slug: "warrington", postcode: "WA1" },
      { name: "Crewe", slug: "crewe", postcode: "CW1" },
      { name: "Macclesfield", slug: "macclesfield", postcode: "SK10" },
      { name: "Runcorn", slug: "runcorn", postcode: "WA7" }
    ]
  },
  {
    county: "Durham",
    slug: "durham",
    towns: [
      { name: "Durham", slug: "durham", postcode: "DH1" },
      { name: "Darlington", slug: "darlington", postcode: "DL1" },
      { name: "Hartlepool", slug: "hartlepool", postcode: "TS24" },
      { name: "Stockton-on-Tees", slug: "stockton-on-tees", postcode: "TS18" },
      { name: "Peterlee", slug: "peterlee", postcode: "SR8" }
    ]
  },
  {
    county: "Northumberland",
    slug: "northumberland",
    towns: [
      { name: "Morpeth", slug: "morpeth", postcode: "NE61" },
      { name: "Alnwick", slug: "alnwick", postcode: "NE66" },
      { name: "Berwick-upon-Tweed", slug: "berwick-upon-tweed", postcode: "TD15" },
      { name: "Hexham", slug: "hexham", postcode: "NE46" },
      { name: "Ashington", slug: "ashington", postcode: "NE63" }
    ]
  },
  {
    county: "Cumbria",
    slug: "cumbria",
    towns: [
      { name: "Carlisle", slug: "carlisle", postcode: "CA1" },
      { name: "Barrow-in-Furness", slug: "barrow-in-furness", postcode: "LA14" },
      { name: "Kendal", slug: "kendal", postcode: "LA9" },
      { name: "Workington", slug: "workington", postcode: "CA14" },
      { name: "Whitehaven", slug: "whitehaven", postcode: "CA28" }
    ]
  },
  {
    county: "Lincolnshire",
    slug: "lincolnshire",
    towns: [
      { name: "Lincoln", slug: "lincoln", postcode: "LN1" },
      { name: "Grimsby", slug: "grimsby", postcode: "DN31" },
      { name: "Scunthorpe", slug: "scunthorpe", postcode: "DN15" },
      { name: "Boston", slug: "boston", postcode: "PE21" },
      { name: "Grantham", slug: "grantham", postcode: "NG31" }
    ]
  },
  {
    county: "Worcestershire",
    slug: "worcestershire",
    towns: [
      { name: "Worcester", slug: "worcester", postcode: "WR1" },
      { name: "Redditch", slug: "redditch", postcode: "B97" },
      { name: "Kidderminster", slug: "kidderminster", postcode: "DY10" },
      { name: "Malvern", slug: "malvern", postcode: "WR14" },
      { name: "Bromsgrove", slug: "bromsgrove", postcode: "B60" }
    ]
  },
  {
    county: "Warwickshire",
    slug: "warwickshire",
    towns: [
      { name: "Warwick", slug: "warwick", postcode: "CV34" },
      { name: "Nuneaton", slug: "nuneaton", postcode: "CV11" },
      { name: "Rugby", slug: "rugby", postcode: "CV21" },
      { name: "Leamington Spa", slug: "leamington-spa", postcode: "CV32" },
      { name: "Stratford-upon-Avon", slug: "stratford-upon-avon", postcode: "CV37" }
    ]
  },
  {
    county: "Buckinghamshire",
    slug: "buckinghamshire",
    towns: [
      { name: "Aylesbury", slug: "aylesbury", postcode: "HP20" },
      { name: "Milton Keynes", slug: "milton-keynes", postcode: "MK1" },
      { name: "High Wycombe", slug: "high-wycombe", postcode: "HP11" },
      { name: "Slough", slug: "slough-bucks", postcode: "SL1" },
      { name: "Amersham", slug: "amersham", postcode: "HP6" }
    ]
  },
  {
    county: "East Sussex",
    slug: "east-sussex",
    towns: [
      { name: "Brighton", slug: "brighton", postcode: "BN1" },
      { name: "Eastbourne", slug: "eastbourne", postcode: "BN21" },
      { name: "Hastings", slug: "hastings", postcode: "TN34" },
      { name: "Bexhill", slug: "bexhill", postcode: "TN39" },
      { name: "Lewes", slug: "lewes", postcode: "BN7" }
    ]
  },
  {
    county: "West Sussex",
    slug: "west-sussex",
    towns: [
      { name: "Chichester", slug: "chichester", postcode: "PO19" },
      { name: "Worthing", slug: "worthing", postcode: "BN11" },
      { name: "Crawley", slug: "crawley", postcode: "RH10" },
      { name: "Horsham", slug: "horsham", postcode: "RH12" },
      { name: "Bognor Regis", slug: "bognor-regis", postcode: "PO21" }
    ]
  },
  {
    county: "Gloucestershire",
    slug: "gloucestershire",
    towns: [
      { name: "Gloucester", slug: "gloucester", postcode: "GL1" },
      { name: "Cheltenham", slug: "cheltenham", postcode: "GL50" },
      { name: "Stroud", slug: "stroud", postcode: "GL5" },
      { name: "Cirencester", slug: "cirencester", postcode: "GL7" },
      { name: "Tewkesbury", slug: "tewkesbury", postcode: "GL20" }
    ]
  },
  {
    county: "Shropshire",
    slug: "shropshire",
    towns: [
      { name: "Shrewsbury", slug: "shrewsbury", postcode: "SY1" },
      { name: "Telford", slug: "telford", postcode: "TF1" },
      { name: "Oswestry", slug: "oswestry", postcode: "SY11" },
      { name: "Bridgnorth", slug: "bridgnorth", postcode: "WV15" },
      { name: "Ludlow", slug: "ludlow", postcode: "SY8" }
    ]
  },
  {
    county: "Herefordshire",
    slug: "herefordshire",
    towns: [
      { name: "Hereford", slug: "hereford", postcode: "HR1" },
      { name: "Leominster", slug: "leominster", postcode: "HR6" },
      { name: "Ross-on-Wye", slug: "ross-on-wye", postcode: "HR9" },
      { name: "Ledbury", slug: "ledbury", postcode: "HR8" },
      { name: "Bromyard", slug: "bromyard", postcode: "HR7" }
    ]
  },
  {
    county: "Isle of Wight",
    slug: "isle-of-wight",
    towns: [
      { name: "Newport", slug: "newport-iow", postcode: "PO30" },
      { name: "Ryde", slug: "ryde", postcode: "PO33" },
      { name: "Sandown", slug: "sandown", postcode: "PO36" },
      { name: "Shanklin", slug: "shanklin", postcode: "PO37" },
      { name: "Cowes", slug: "cowes", postcode: "PO31" }
    ]
  }
]

// ============================================================================
// SITE CONFIGURATION
// ============================================================================

const SITE_CONFIG = {
  keyword: "child injury claims",
  keywordCapitalized: "Child Injury Claims",
  domain: "https://childinjuryclaims.co.uk",
  brandName: "Child Injury Claims",
  serviceType: "Child Injury Claims Specialists",
  phone: "0800 123 4567",
  email: "claims@childinjuryclaims.co.uk"
}

// ============================================================================
// CONTENT GENERATORS
// ============================================================================

const getHomepageContent = () => ({
  title: "Child Injury Claims - No Win No Fee Compensation Specialists",
  description: "Expert child injury claims specialists helping families across the UK claim compensation. No win no fee, free assessment, 98% success rate. Call today.",
  h1: "Child Injury Claims - Expert Compensation Specialists",
  sections: [
    {
      h2: "Who Can Make A Child Injury Claim?",
      content: [
        "When a child suffers an injury due to someone else's negligence, the legal process for seeking compensation differs significantly from adult claims. In the United Kingdom, children under the age of 18 cannot bring a claim in their own name; instead, a parent, guardian, or other suitable adult must act as a 'litigation friend' to pursue the claim on their behalf. This legal representative makes decisions about the claim and ensures that the child's best interests are prioritised throughout the proceedings. The litigation friend works closely with solicitors to gather evidence, negotiate with insurance companies, and ultimately secure the compensation the injured child deserves.",
        "The scope of who can be a litigation friend is quite broad under English law. Parents are the most common choice, but grandparents, older siblings, social workers, or any responsible adult with a genuine interest in the child's welfare can apply to the court for this role. The court must approve the appointment of a litigation friend to ensure they are suitable and have no conflicts of interest that might compromise the child's claim. This safeguard protects vulnerable children from exploitation and ensures that compensation settlements are genuinely in their best interests.",
        "It is important to understand that the three-year limitation period for making a personal injury claim does not begin until the child reaches the age of 18. This means that a child has until their 21st birthday to bring a claim, even if the injury occurred when they were very young. However, it is generally advisable to pursue child injury claims as soon as possible after the incident, whilst evidence is fresh and witnesses can be located. Early resolution also ensures that compensation can be used for the child's care, rehabilitation, and educational needs during their developmental years."
      ]
    },
    {
      h2: "How Much Compensation Can I Claim For Child Injury Claims?",
      content: [
        "The amount of compensation available for child injury claims varies considerably depending on the severity and nature of the injury, its long-term impact on the child's life, and the circumstances surrounding the incident. Compensation is typically calculated using two main categories: general damages, which compensate for pain, suffering, and loss of amenity; and special damages, which cover financial losses such as medical expenses, travel costs, and future care needs. For serious injuries that affect a child's future earning capacity or require ongoing medical treatment, special damages can form a substantial portion of the overall award.",
        "The Judicial College Guidelines provide a framework for assessing general damages in personal injury cases, including those involving children. For minor injuries such as sprains, bruises, or minor fractures, compensation might range from £1,000 to £10,000. More serious injuries, including significant fractures, scarring, or psychological trauma, could attract awards between £10,000 and £50,000. In cases involving catastrophic injuries such as brain damage, spinal cord injuries, or severe burns, compensation can reach several million pounds to account for lifetime care costs, adapted accommodation, and lost future earnings.",
        "It is crucial that child injury claims are properly valued, as the court must approve any settlement to ensure it is in the child's best interests. Unlike adult claims where the claimant can accept any offer they choose, settlements for children require court approval at an infant approval hearing. The judge will examine the evidence, consider whether the settlement is reasonable, and determine how the compensation should be managed for the child's benefit. This typically involves investing the funds in the Court Funds Office until the child reaches 18, though earlier releases can be approved for specific needs such as educational expenses or medical treatment."
      ]
    },
    {
      h2: "What Are The Most Common Causes Of Child Injury Claims?",
      content: [
        "Road traffic accidents represent one of the most common causes of child injury claims in the UK. Children are particularly vulnerable as pedestrians, cyclists, and passengers in vehicles. Whether struck by a car whilst crossing the road, injured as a passenger in a collision, or hurt in a cycling accident, children can suffer a wide range of injuries from minor whiplash to life-changing trauma. Driver negligence, including speeding, distracted driving, and failure to observe children near roads, often underlies these tragic incidents. The law recognises that children cannot be expected to exercise the same level of road safety awareness as adults, which can strengthen claims against negligent drivers.",
        "Accidents at school and in educational settings form another significant category of child injury claims. Schools have a duty of care to protect pupils from foreseeable harm, whether during lessons, break times, sports activities, or school trips. Injuries can result from inadequate supervision, poorly maintained equipment, unsafe premises, or negligent teaching practices. PE and sports injuries, playground accidents, and incidents during science experiments are common scenarios. Educational institutions must carry out risk assessments and implement appropriate safety measures; failure to do so may constitute negligence giving rise to a compensation claim.",
        "Medical negligence affecting children can have devastating and lifelong consequences. Birth injuries, including cerebral palsy caused by oxygen deprivation during delivery, misdiagnosis of childhood illnesses, surgical errors, and medication mistakes all fall within this category. Clinical negligence claims involving children are often complex and require expert medical evidence to establish that the standard of care fell below acceptable levels. The compensation in such cases can be substantial, reflecting the profound impact that medical errors can have on a child's entire life trajectory, including their need for ongoing care, assistance, and support."
      ]
    },
    {
      h2: "How Do I Start A Child Injury Claim?",
      content: [
        "The first step in pursuing a child injury claim is to seek specialist legal advice from solicitors experienced in handling children's compensation cases. Not all personal injury lawyers have expertise in this area, and the procedural requirements for child claims differ significantly from adult claims. A specialist solicitor will assess the circumstances of the injury, advise on the strength of the claim, and guide you through the process of becoming a litigation friend if you are not already acting in that capacity. They will also explain the funding options available, including no win no fee arrangements that protect families from financial risk.",
        "Gathering evidence is a crucial early step in building a successful child injury claim. This includes obtaining medical records documenting the injury and treatment, collecting witness statements from anyone who saw the incident occur, securing CCTV footage if available, and preserving any physical evidence relevant to the case. Photographs of injuries, the accident location, and any defective equipment or hazardous conditions that contributed to the incident can be invaluable. Your solicitor will work with you to identify and secure all relevant evidence before it becomes unavailable or memories fade.",
        "Once evidence has been gathered, your solicitor will prepare and send a letter of claim to the responsible party or their insurers, outlining the allegations of negligence and the injuries suffered. The defendant then has a fixed period to respond, either admitting or denying liability. If liability is admitted, negotiations can proceed towards settlement. If denied, your solicitor will advise on the prospects of success at trial and whether court proceedings should be issued. Throughout this process, the child's best interests remain paramount, and any settlement must be approved by the court to ensure it is fair and appropriate."
      ]
    },
    {
      h2: "How Long Do I Have To Make A Child Injury Claim?",
      content: [
        "The limitation period for child injury claims operates differently from adult claims in a way that provides significant protection for injured children. Under the Limitation Act 1980, the standard three-year period for bringing a personal injury claim does not begin to run until the child reaches the age of 18. This means that a child injured at any point during their minority has until their 21st birthday to issue court proceedings. This extended timeframe recognises that children cannot reasonably be expected to understand and pursue their legal rights whilst they are still young.",
        "Despite this generous limitation period, there are compelling reasons to pursue child injury claims promptly rather than waiting until the child approaches adulthood. Evidence deteriorates over time: witnesses may become difficult to locate, their memories may fade, and documents can be lost or destroyed. Furthermore, securing compensation early allows the funds to be used for the child's benefit during their developmental years, whether for private medical treatment, specialist educational support, or rehabilitation services that might not be available on the NHS. Early resolution also provides certainty and closure for families affected by the incident.",
        "There are some circumstances where different limitation rules apply. For claims involving criminal injuries, an application to the Criminal Injuries Compensation Authority must generally be made within two years of the incident, regardless of the child's age. For claims against public bodies, there may be notice requirements that must be satisfied within shorter timeframes. Your solicitor will advise on the specific limitation periods applicable to your child's claim and ensure that all procedural requirements are met within the relevant deadlines."
      ]
    },
    {
      h2: "What Evidence Is Required For A Child Injury Claim?",
      content: [
        "Medical evidence forms the cornerstone of any child injury claim. Your solicitor will obtain copies of all medical records relating to the incident, including A&E notes, hospital admissions, GP records, and any specialist reports. In most cases, an independent medical expert will be instructed to prepare a report on the nature and extent of the child's injuries, their prognosis, and any ongoing treatment needs. This expert evidence is essential for valuing the claim accurately and ensuring that future needs are properly accounted for in any settlement.",
        "Evidence of negligence must also be gathered to establish that the defendant breached their duty of care towards the child. The nature of this evidence will depend on the circumstances of the incident. For a road traffic accident, this might include the police accident report, witness statements from drivers and pedestrians, and forensic analysis of the collision. For a school accident, this could involve risk assessments, maintenance records, staff training logs, and evidence of previous similar incidents. Your solicitor will identify what evidence is needed and take steps to secure it.",
        "Financial evidence is required to support any claim for special damages. This includes receipts for medical expenses, travel costs for attending appointments, costs of care provided by family members, and any other expenditure incurred as a result of the injury. For children with ongoing needs, expert evidence may be required to quantify future losses, including the cost of care, assistance, equipment, and adapted accommodation. This evidence helps ensure that the compensation recovered is sufficient to meet the child's needs throughout their life."
      ]
    },
    {
      h2: "How Long Does A Child Injury Claim Take To Settle?",
      content: [
        "The duration of a child injury claim depends on numerous factors, including the complexity of the case, the severity of the injuries, whether liability is disputed, and the child's prognosis. Straightforward claims where liability is admitted and injuries are relatively minor might settle within 6 to 12 months. More complex cases involving disputed liability, serious injuries, or the need for extensive expert evidence can take several years to resolve. Your solicitor will provide an estimated timeframe based on the specific circumstances of your child's case.",
        "One factor that can extend the duration of child injury claims is the need to assess the long-term impact of injuries. For children who are still growing and developing, it may be necessary to wait until their condition has stabilised before a final settlement can be reached. Rushing to settlement before the full extent of the child's needs is known could result in under-compensation that cannot later be corrected. In such cases, interim payments may be obtained to meet immediate needs whilst the claim continues towards final resolution.",
        "The court approval process adds an additional step to child injury settlements that does not apply to adult claims. Once a settlement is agreed between the parties, it must be approved by a judge at an infant approval hearing. The judge will review the evidence, ensure the settlement is in the child's best interests, and make directions for the management of the compensation funds. This process typically takes several weeks to arrange, but provides important protection for the child by ensuring that settlements are fair and appropriate."
      ]
    },
    {
      h2: "Claims Involving Uninsured Or Unknown Parties",
      content: [
        "Child injury claims can present particular challenges when the responsible party is uninsured, untraceable, or unknown. In road traffic accidents involving uninsured or hit-and-run drivers, the Motor Insurers' Bureau (MIB) provides a scheme of last resort for compensating victims. Claims to the MIB must comply with strict procedural requirements and time limits, making early legal advice essential. The MIB will investigate the circumstances and may compensate the child if all criteria are met, though the process can be lengthy and complex.",
        "For accidents on private land where the occupier is uninsured or insolvent, recovering compensation can be more difficult. However, there may be alternative sources of recovery, such as insurance policies held by the child's family, or schemes established by industry bodies. In some cases, local authorities or other public bodies may bear responsibility for failing to take enforcement action against known hazards. Your solicitor will explore all available avenues for recovering compensation on your child's behalf.",
        "Criminal injuries represent another category where the perpetrator may be unknown or unable to pay compensation. The Criminal Injuries Compensation Authority (CICA) administers a government-funded scheme for compensating victims of violent crime, including children. Applications must generally be made within two years of the incident, and there is no requirement for the perpetrator to have been identified or prosecuted. Compensation under the CICA scheme is calculated according to a tariff system and may be lower than civil damages, but provides an important source of redress where no other remedy is available."
      ]
    },
    {
      h2: "What Damages Can Be Claimed?",
      content: [
        "Child injury claims can recover both general damages and special damages. General damages compensate for pain, suffering, and loss of amenity - the non-financial impact of the injury on the child's life. This includes physical pain, emotional distress, and the inability to participate in activities they would otherwise have enjoyed. For children, particular consideration is given to the impact on their education, social development, and future prospects. The courts recognise that injuries sustained in childhood can shape a person's entire life trajectory, and compensation reflects this broader impact.",
        "Special damages cover the financial losses incurred as a result of the injury. For children, this typically includes medical expenses not covered by the NHS, costs of private treatment or therapy, travel expenses for attending appointments, and the cost of equipment or aids needed due to the injury. If a parent has had to reduce their working hours or give up employment to care for an injured child, a claim can be made for their lost earnings. The cost of professional care, where needed, can also be recovered, whether provided by family members or external carers.",
        "Future losses represent a particularly important category of damages in serious child injury claims. If the injury will affect the child throughout their life, compensation must account for their future needs. This includes ongoing medical treatment and therapy, care and assistance, specialist equipment, adapted accommodation, and transport. If the injury will affect the child's ability to work, a claim can be made for lost future earnings. Calculating these future losses requires expert evidence from medical professionals, care experts, and forensic accountants, and can result in substantial awards that are invested to provide for the child's lifetime needs."
      ]
    },
    {
      h2: "No Win No Fee Explained",
      content: [
        "No win no fee arrangements, formally known as Conditional Fee Agreements (CFAs), provide access to justice for families who could not otherwise afford to pursue a child injury claim. Under this arrangement, your solicitor agrees not to charge any fees if the claim is unsuccessful. If the claim succeeds, the solicitor receives their standard fees plus a success fee, which is capped by law at a percentage of those fees. This structure means that families can pursue legitimate claims without the risk of facing a legal bill they cannot afford if the case does not succeed.",
        "To protect against the risk of having to pay the defendant's costs if the claim fails, After the Event (ATE) insurance is typically taken out as part of the no win no fee arrangement. This insurance covers the defendant's costs if the case is unsuccessful, and the premium is only payable if the claim succeeds. The cost of ATE insurance and the success fee are generally recoverable from the defendant as part of the costs in successful cases, meaning that the child retains the full amount of their compensation. Your solicitor will explain all costs and funding arrangements at the outset of the claim.",
        "No win no fee arrangements have made legal representation accessible to families across the UK, regardless of their financial circumstances. This is particularly important for child injury claims, where the stakes are high and the legal process can be complex. By removing the financial barrier to pursuing justice, no win no fee arrangements ensure that children who have been injured through no fault of their own have the opportunity to obtain the compensation they need and deserve. When choosing a solicitor, ensure they have specific experience in child injury claims and clearly explain their fee structure."
      ]
    },
    {
      h2: "Why Choose Us For Your Child Injury Claim?",
      content: [
        "Our specialist team has extensive experience handling child injury claims across the full spectrum of circumstances, from minor accidents at school to catastrophic injuries with lifelong consequences. We understand the sensitivity required when dealing with injured children and their families, and we approach every case with compassion, professionalism, and an unwavering commitment to achieving the best possible outcome. Our solicitors are experts in navigating the unique procedural requirements that apply to children's claims, including court approval of settlements and the appointment of litigation friends.",
        "We have a proven track record of securing substantial compensation for injured children, with settlements ranging from thousands to millions of pounds depending on the severity of the injury. Our approach combines thorough preparation with strategic advocacy, ensuring that every aspect of the claim is properly evidenced and persuasively presented. We work with leading medical experts, care specialists, and forensic accountants to build compelling cases that secure the full compensation our young clients deserve. Our success rate of 98% speaks to the quality of our work and our dedication to each case.",
        "Beyond the legal aspects, we provide holistic support to families navigating the aftermath of a child's injury. We can connect you with support services, rehabilitation providers, and educational specialists who can help your child recover and thrive. We understand that compensation is not just about money; it's about securing the resources your child needs to reach their full potential despite their injuries. By choosing us, you gain a partner who will fight tirelessly for your child's rights and future wellbeing."
      ]
    },
    {
      h2: "Areas We Cover",
      content: [
        "We provide expert child injury claims services across the entire United Kingdom, with specialist solicitors based in offices throughout England, Scotland, Wales, and Northern Ireland. Whether you are located in a major city like London, Manchester, Birmingham, or Edinburgh, or in a smaller town or rural area, we can assist you with your child's compensation claim. Our national coverage means you can access specialist legal representation regardless of where the incident occurred or where you live.",
        "Our solicitors have in-depth knowledge of local courts, medical facilities, and support services throughout the UK. This local expertise can be valuable in building your child's claim, as we can work with nearby medical experts for examinations and reports, and we understand the procedures and preferences of local courts. We have successfully handled child injury claims in every county of England and Wales, as well as throughout Scotland and Northern Ireland, giving us a breadth of experience that benefits every client we represent.",
        "Distance is no barrier to accessing our services. We offer flexible consultation options including telephone calls, video conferences, and home visits where appropriate, ensuring that families in remote areas or those with mobility difficulties can access our expertise. We have invested in secure technology that allows us to manage claims efficiently and communicate effectively with clients throughout the UK. Wherever you are located, you will receive the same high standard of service and the same commitment to achieving the best possible outcome for your child."
      ]
    }
  ]
})

// Location page content generator
const getLocationPageContent = (location: string, isCounty: boolean, countyData?: typeof locationData[0], townData?: { name: string; slug: string; postcode: string }) => ({
  title: isCounty 
    ? `Child Injury Claims in ${location} - Claim Compensation Today`
    : `Child Injury Claims in ${location} - Claim Compensation After an Incident ${townData?.postcode || ''}`,
  description: `Expert child injury claims specialists in ${location}. No win no fee compensation claims for injured children. Free assessment, 98% success rate. Call today.`,
  h1: isCounty 
    ? `Child Injury Claims in ${location} - Expert Local Specialists`
    : `Child Injury Claims in ${location} ${townData?.postcode || ''} - Expert Compensation Advice`,
  sections: [
    {
      h2: `Who Can Make A Child Injury Claim in ${location}?`,
      content: [
        `Families in ${location} who have children that have suffered injuries due to someone else's negligence have the right to pursue compensation through the legal system. When a child is injured in ${location}, whether through a road traffic accident, an incident at school, or any other negligent act, a parent, guardian, or responsible adult can act as a litigation friend to bring the claim on the child's behalf. This legal mechanism ensures that children in ${location} who cannot represent themselves still have access to justice and the compensation they deserve for their injuries and suffering.`,
        `The role of litigation friend in ${location} child injury claims carries important responsibilities. The appointed individual must make decisions that are in the child's best interests throughout the claims process, working closely with solicitors to gather evidence, negotiate with insurance companies, and ultimately secure fair compensation. ${isCounty ? `Throughout ${location} and the surrounding areas` : `In ${location} and the broader ${countyData?.county || 'region'} area`}, our experienced legal team guides litigation friends through every step of this process, ensuring they understand their responsibilities and the options available for their child's claim.`,
        `Children in ${location} benefit from special protection under the law regarding limitation periods. Unlike adults who have three years from the date of injury to bring a claim, children have until their 21st birthday. However, we strongly advise families in ${location} to pursue claims promptly after an incident occurs. Early action preserves evidence, allows witnesses to be located whilst memories are fresh, and ensures compensation can be obtained quickly to fund the child's recovery and any necessary treatment or support in ${location}.`
      ]
    },
    {
      h2: `How Much Compensation Can I Claim For Child Injury in ${location}?`,
      content: [
        `The compensation available for child injury claims in ${location} depends on the specific circumstances of each case, including the nature and severity of the injury, its impact on the child's life, and the long-term prognosis. Compensation is divided into general damages for pain, suffering, and loss of amenity, and special damages for financial losses. For families in ${location}, this can include everything from minor injuries resulting in compensation of a few thousand pounds to catastrophic injuries warranting awards of several million pounds to cover lifetime care and support needs.`,
        `Special damages in ${location} child injury claims can encompass a wide range of financial losses. This includes medical expenses for private treatment in ${location} or elsewhere, travel costs to hospitals and rehabilitation centres, the cost of care provided by family members or professional carers, and any specialist equipment the child needs. If a parent in ${location} has had to reduce their working hours or leave employment to care for an injured child, these lost earnings can also be claimed. Future losses are particularly important in serious injury cases, accounting for the child's ongoing needs throughout their life.`,
        `Settlements for children in ${location} must be approved by the court to ensure they are fair and in the child's best interests. This protection applies regardless of whether liability is admitted or disputed, and provides an important safeguard for injured children. At an infant approval hearing, a judge will examine the evidence and ensure the settlement adequately compensates the child for their injuries. The compensation is typically invested in the Court Funds Office until the child reaches 18, though earlier release can be approved for specific needs such as educational expenses or medical treatment in ${location}.`
      ]
    },
    {
      h2: `What Are The Most Common Causes Of Child Injury in ${location}?`,
      content: [
        `Road traffic accidents represent a significant cause of child injuries in ${location}, as in the rest of the UK. Children are particularly vulnerable as pedestrians, cyclists, and passengers, and the consequences can be devastating. ${isCounty ? `Throughout ${location}` : `In ${location}`}, negligent driving, failure to observe children near roads, and inadequate road safety measures can all contribute to accidents resulting in child injuries. Our legal team has extensive experience handling these claims, working to establish liability and secure compensation for affected families in ${location}.`,
        `Accidents at schools and educational establishments in ${location} form another major category of child injury claims. ${isCounty ? `Schools across ${location}` : `Schools in ${location}`} have a duty of care to protect pupils, and failures in supervision, maintenance of equipment, or safety procedures can result in injuries. PE and sports accidents, playground incidents, and injuries during school trips all fall within this category. We work with families in ${location} to investigate school accidents, establish negligence, and pursue appropriate compensation for injured children.`,
        `Medical negligence, public liability incidents, and accidents in public places in ${location} also contribute to child injury statistics. From misdiagnosis of childhood illnesses to injuries in parks, shops, or leisure facilities, these incidents can have serious consequences for children and their families. ${isCounty ? `Throughout ${location}, our solicitors` : `Our ${location} solicitors`} have experience handling all types of child injury claims and can advise on the merits of pursuing compensation in your specific circumstances. We offer free initial assessments to help families understand their options.`
      ]
    },
    {
      h2: `How Do I Start A Child Injury Claim in ${location}?`,
      content: [
        `Beginning a child injury claim in ${location} starts with obtaining specialist legal advice from solicitors experienced in children's compensation cases. Our ${location} team offers free initial consultations to assess your child's case and explain the options available. We will advise on the strength of the claim, the process of becoming a litigation friend, and the funding options including no win no fee arrangements. This initial advice helps families in ${location} make informed decisions about pursuing compensation without any financial commitment or obligation.`,
        `Gathering evidence is the next crucial step in building a successful child injury claim in ${location}. This includes obtaining medical records from ${isCounty ? `hospitals and GPs in ${location}` : `local hospitals and GPs in ${location}`}, collecting witness statements, securing CCTV footage where available, and preserving any physical evidence relevant to the incident. Our solicitors in ${location} are skilled at identifying and securing evidence quickly, before it becomes unavailable. We work with medical experts and other specialists to build comprehensive evidence packages that support our clients' claims.`,
        `Once the evidence is assembled, we prepare and send a formal letter of claim to the responsible party or their insurers, outlining the allegations of negligence and the injuries suffered. ${isCounty ? `Defendants in ${location} and beyond` : `Defendants`} have a fixed period to respond, after which negotiations can proceed or court proceedings may be issued. Throughout this process, our ${location} team keeps clients informed of progress and provides clear advice on all decisions that need to be made, always keeping the child's best interests at the forefront of our approach.`
      ]
    },
    {
      h2: `How Long Do I Have To Make A Child Injury Claim in ${location}?`,
      content: [
        `Child injury claims in ${location} benefit from extended limitation periods that recognise children cannot reasonably be expected to understand and pursue their legal rights. The standard three-year period does not begin until the child reaches 18, meaning a child injured at any age has until their 21st birthday to bring a claim. This provides significant protection for children in ${location}, ensuring they are not disadvantaged by their age when seeking compensation for injuries caused by others' negligence.`,
        `Despite this generous timeframe, there are compelling reasons for families in ${location} to pursue child injury claims promptly. Evidence deteriorates over time - witnesses become difficult to locate, their memories fade, and documents may be lost or destroyed. ${isCounty ? `Local evidence in ${location}` : `Evidence specific to ${location}`}, such as CCTV footage from nearby businesses or records from local facilities, may be overwritten or discarded if not secured quickly. Early action ensures the strongest possible case can be built and compensation obtained whilst it can make the most difference to the child's recovery.`,
        `Some child injury claims in ${location} are subject to shorter time limits that require immediate attention. Claims to the Criminal Injuries Compensation Authority must generally be made within two years, regardless of the child's age. Claims against public bodies may require formal notice within shorter periods. Our ${location} solicitors will advise on the specific limitation periods applicable to your child's claim and ensure all procedural requirements are met within the relevant deadlines, protecting your child's right to compensation.`
      ]
    },
    {
      h2: `Evidence Required For A Child Injury Claim in ${location}`,
      content: [
        `Medical evidence forms the foundation of any child injury claim in ${location}. Our solicitors will obtain comprehensive medical records documenting the injury and treatment, whether at ${isCounty ? `hospitals in ${location}` : `${location} hospitals`} or further afield. Independent medical experts are instructed to prepare detailed reports on the nature and extent of injuries, the prognosis, and any ongoing treatment needs. This expert evidence is essential for accurately valuing the claim and ensuring all future needs are properly accounted for in any settlement for children in ${location}.`,
        `Evidence of negligence must be established to succeed in a child injury claim in ${location}. The specific evidence required depends on how the injury occurred. For road traffic accidents in ${location}, this might include police reports, witness statements, and forensic collision analysis. For school accidents, risk assessments, maintenance records, and evidence of previous incidents may be relevant. Our ${location} team has experience investigating all types of incidents and identifying the evidence needed to prove negligence in each case.`,
        `Financial evidence supports claims for special damages in ${location} child injury cases. This includes receipts for medical expenses, travel costs to appointments, and expenditure on equipment or care. For serious injuries with ongoing implications, expert evidence quantifies future losses including care costs, equipment needs, and lost future earnings. Our solicitors work with care experts, accountants, and other specialists to ensure all financial losses are properly calculated and claimed, maximising the compensation available for the child's future in ${location}.`
      ]
    },
    {
      h2: `How Long Does A Child Injury Claim Take To Settle in ${location}?`,
      content: [
        `The duration of child injury claims in ${location} varies depending on the complexity of the case and the severity of injuries. Straightforward claims where liability is admitted might settle within 6 to 12 months, whilst more complex cases involving disputed liability or serious injuries can take several years. Our ${location} solicitors provide realistic time estimates at the outset and keep clients informed of progress throughout the claims process, ensuring families understand what to expect and when.`,
        `For children in ${location} with serious injuries, it may be necessary to wait until their condition has stabilised before finalising a settlement. Rushing to settle before the full extent of the child's needs is known could result in under-compensation. During this time, we can seek interim payments to meet immediate needs for treatment, care, or equipment. ${isCounty ? `Throughout ${location}` : `In ${location}`}, we have helped families access interim funding to support their child's recovery whilst the claim progresses towards final resolution.`,
        `The court approval process adds a final step to child injury settlements in ${location}. Once terms are agreed, a judge must approve the settlement at an infant approval hearing to ensure it is fair and in the child's best interests. This typically takes several weeks to arrange. The judge will also decide how the compensation should be managed - usually investment in the Court Funds Office until the child reaches 18, though earlier releases can be approved for specific needs. This process protects children in ${location} and ensures settlements are appropriate.`
      ]
    },
    {
      h2: `Local Support For Child Injury Claims in ${location}`,
      content: [
        `Families in ${location} pursuing child injury claims can access a range of local support services to assist with their child's recovery and rehabilitation. ${isCounty ? `Throughout ${location}` : `In ${location}`}, there are medical facilities, therapy providers, and support organisations that can help children recover from injuries and adapt to any lasting effects. Our solicitors can connect clients with appropriate local services and ensure treatment and support needs are documented and included in compensation claims.`,
        `Our ${location} team has built strong relationships with medical experts, rehabilitation specialists, and care providers in the area. This network allows us to arrange examinations and assessments quickly, and to obtain expert evidence that supports our clients' claims. ${isCounty ? `Whether in the main towns of ${location} or more rural areas` : `Whether in ${location} town centre or surrounding areas`}, we can facilitate access to the specialists needed to build strong cases and secure appropriate compensation for injured children.`,
        `Beyond the legal aspects of child injury claims, we understand that families in ${location} need practical support following an incident. We can provide information about local support groups, charitable organisations, and statutory services that may be able to assist. Our holistic approach ensures that families receive comprehensive support, not just legal representation. ${isCounty ? `Across ${location}` : `In ${location}`}, we are committed to helping injured children and their families access all the resources they need to move forward positively.`
      ]
    },
    {
      h2: `Why Choose Our ${location} Child Injury Claims Specialists?`,
      content: [
        `Our child injury claims team in ${location} combines specialist legal expertise with genuine compassion for the families we represent. We understand that pursuing a compensation claim can be stressful, particularly when dealing with a child's injury and recovery. Our ${location} solicitors provide clear, honest advice and handle all aspects of the claim efficiently, allowing families to focus on supporting their child. We are accessible, responsive, and dedicated to achieving the best possible outcomes for every client.`,
        `We have a proven track record of success in child injury claims in ${location} and throughout the UK. Our experience covers all types of child injury cases, from minor accidents to catastrophic injuries with lifelong consequences. We have secured substantial settlements and court awards for children in ${location}, with compensation that properly reflects their injuries, ongoing needs, and future requirements. Our 98% success rate demonstrates our expertise and commitment to every case we take on.`,
        `Our no win no fee service ensures that families in ${location} can access expert legal representation regardless of their financial circumstances. We offer free initial consultations to assess cases and explain the claims process. If we take on your child's claim, you will not pay any upfront costs, and if the claim is unsuccessful, you will not pay our fees. This removes the financial risk from pursuing compensation and ensures that all children in ${location} who have been injured through negligence have access to justice.`
      ]
    },
    {
      h2: `Other Areas We Cover Near ${location}`,
      content: [
        `Whilst we provide dedicated service to clients in ${location}, our child injury claims expertise extends across the entire United Kingdom. ${isCounty ? `Within ${location}, we cover all major towns and communities` : `In the broader ${countyData?.county || 'region'} area, we serve clients in multiple towns and villages`}, ensuring that families throughout the region can access specialist legal representation for their child's injury claim. Our national network of solicitors means we can assist regardless of where the incident occurred or where you are located.`,
        `${isCounty ? `From ${location}, we also serve neighbouring counties` : `From ${location}, we serve clients throughout ${countyData?.county || 'the county'} and adjacent areas`}, providing the same high standard of service and expertise. Our solicitors are familiar with courts, medical facilities, and support services across the UK, allowing us to handle claims efficiently wherever they arise. Whether your child was injured locally or elsewhere in the country, we can provide expert representation and pursue the compensation they deserve.`,
        `Our flexible approach to client service means that distance is never a barrier to accessing our child injury claims expertise. We offer consultations by telephone, video call, and can arrange home visits in ${location} and surrounding areas where appropriate. Secure technology allows us to manage claims efficiently and communicate effectively with clients throughout the UK. Wherever you are located, you will receive the same dedicated service and the same commitment to achieving the best outcome for your child.`
      ]
    }
  ]
})

// Static page content
const getAboutContent = () => ({
  title: "About Us | Child Injury Claims Specialists",
  description: "Learn about our experienced team of child injury claims specialists. Dedicated to helping families across the UK secure compensation for injured children.",
  h1: "About Child Injury Claims Specialists",
  content: `
    <p class="mb-4">Child Injury Claims Specialists is a dedicated legal practice focused exclusively on helping families pursue compensation for children who have been injured through no fault of their own. With years of experience in this sensitive and specialised area of law, we have helped hundreds of families across the United Kingdom secure the compensation their children need and deserve.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Our Mission</h2>
    <p class="mb-4">Our mission is simple: to ensure that every child who has been injured due to someone else's negligence has access to expert legal representation and the compensation they need to support their recovery and future. We believe that financial barriers should never prevent a child from obtaining justice, which is why we offer our services on a no win no fee basis.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Our Team</h2>
    <p class="mb-4">Our team comprises specialist solicitors, legal executives, and support staff who are passionate about child injury law. Each member of our team undergoes continuous professional development to stay at the forefront of this evolving area of law. We are proud members of the Law Society and are regulated by the Solicitors Regulation Authority, ensuring the highest standards of professional conduct.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Our Approach</h2>
    <p class="mb-4">We approach every case with compassion, professionalism, and an unwavering commitment to our clients' best interests. We understand that pursuing a compensation claim can be stressful, particularly when dealing with a child's injury and recovery. That's why we handle all aspects of the claim efficiently and keep our clients informed at every stage. Our goal is to make the process as straightforward as possible whilst achieving the best possible outcome for each child.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Our Track Record</h2>
    <p class="mb-4">We have successfully recovered millions of pounds in compensation for injured children across the UK. Our cases have ranged from minor injuries to catastrophic, life-changing conditions, and we have achieved positive outcomes in over 98% of the claims we have handled. We are proud of the difference we have made in our clients' lives, providing them with the financial resources to access treatment, support, and opportunities they might otherwise have been denied.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Contact Us</h2>
    <p class="mb-4">If your child has been injured and you would like to discuss the possibility of making a compensation claim, please contact us for a free, no-obligation consultation. We are here to help you understand your options and guide you through the claims process with expertise and compassion.</p>
  `
})

const getContactContent = () => ({
  title: "Contact Us | Child Injury Claims Specialists",
  description: "Contact our child injury claims team for a free, no-obligation assessment. Call us or complete our online form to discuss your child's compensation claim.",
  h1: "Contact Child Injury Claims Specialists"
})

const getPrivacyContent = () => ({
  title: "Privacy Policy | Child Injury Claims Specialists",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal information when you use our child injury claims services.",
  h1: "Privacy Policy",
  content: `
    <p class="mb-4">At Child Injury Claims Specialists, we are committed to protecting your privacy and ensuring the security of any personal information you provide to us. This privacy policy explains how we collect, use, and safeguard your information when you use our services or visit our website.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Information We Collect</h2>
    <p class="mb-4">We may collect personal information including your name, contact details, and information about your child's injury and circumstances when you contact us for advice or to make a claim. We also collect information automatically when you visit our website, including your IP address, browser type, and pages visited.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">How We Use Your Information</h2>
    <p class="mb-4">We use your personal information to provide legal services, respond to enquiries, improve our website, and communicate with you about our services. We do not sell your personal information to third parties. We may share your information with third parties who assist us in providing our services, such as medical experts and insurance companies, but only with your consent and where necessary for your claim.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Data Security</h2>
    <p class="mb-4">We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. Our systems are regularly reviewed and updated to ensure ongoing security.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Your Rights</h2>
    <p class="mb-4">Under the General Data Protection Regulation (GDPR), you have the right to access your personal data, request correction of inaccurate data, request deletion of your data, and object to processing. To exercise these rights, please contact us using the details provided on our website.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Cookies</h2>
    <p class="mb-4">Our website uses cookies to enhance your browsing experience and analyse website traffic. For more information about cookies, please see our Cookie Policy.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Contact Us</h2>
    <p class="mb-4">If you have any questions about this privacy policy or our data practices, please contact us at ${SITE_CONFIG.email}.</p>
  `
})

const getCookiesContent = () => ({
  title: "Cookie Policy | Child Injury Claims Specialists",
  description: "Learn about how we use cookies on our child injury claims website and how you can manage your cookie preferences.",
  h1: "Cookie Policy",
  content: `
    <p class="mb-4">This Cookie Policy explains what cookies are, how we use them on the Child Injury Claims Specialists website, and how you can manage your cookie preferences.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">What Are Cookies?</h2>
    <p class="mb-4">Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners about how visitors use their site.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Types of Cookies We Use</h2>
    <p class="mb-4"><strong class="text-[#1a2744]">Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.</p>
    <p class="mb-4"><strong class="text-[#1a2744]">Analytics Cookies:</strong> We use analytics cookies to understand how visitors interact with our website. This helps us improve our website and services. We use Google Analytics for this purpose.</p>
    <p class="mb-4"><strong class="text-[#1a2744]">Functional Cookies:</strong> These cookies allow the website to remember choices you make, such as your cookie preferences, to provide enhanced features.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Managing Cookies</h2>
    <p class="mb-4">Most web browsers allow you to control cookies through their settings. You can usually find these settings in the 'options' or 'preferences' menu of your browser. However, restricting cookies may impact the functionality of our website.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Changes to This Policy</h2>
    <p class="mb-4">We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Contact Us</h2>
    <p class="mb-4">If you have any questions about our use of cookies, please contact us at ${SITE_CONFIG.email}.</p>
  `
})

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Home() {
  // Track if component is mounted (for hydration safety)
  const [mounted, setMounted] = useState(false)
  
  // Initialize with simple values for SSR consistency
  const [currentPath, setCurrentPath] = useState('/')
  const [showCookieBanner, setShowCookieBanner] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [leadFormStep, setLeadFormStep] = useState(1)
  const [formData, setFormData] = useState({
    incidentType: '',
    incidentDate: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  // Calculator state
  const [calcInjury, setCalcInjury] = useState('')
  const [calcSeverity, setCalcSeverity] = useState('')
  const [calcResult, setCalcResult] = useState('')

  // Initialize on mount (after hydration)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration safety
    setMounted(true)
    
    // Set initial values from window
    const hash = window.location.hash.slice(1) || '/'
    setCurrentPath(hash)
    
    // Check cookie consent
    const cookieConsent = localStorage.getItem('cookieConsent')
    setShowCookieBanner(!cookieConsent)
    
    // Hash change listener
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1) || '/'
      setCurrentPath(newHash)
      window.scrollTo(0, 0)
      setMobileMenuOpen(false)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Search results using useMemo
  const searchResults = useMemo(() => {
    if (searchQuery.length > 1) {
      return locationData.filter(county => 
        county.county.toLowerCase().includes(searchQuery.toLowerCase()) ||
        county.towns.some(town => town.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }
    return []
  }, [searchQuery])

  const handleCookieAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowCookieBanner(false)
  }

  const handleCookieDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setShowCookieBanner(false)
  }

  const navigateTo = useCallback((path: string) => {
    if (typeof window !== 'undefined') {
      window.location.hash = path
    }
  }, [])

  // Parse current path to determine page type
  const parsePath = useCallback(() => {
    if (!currentPath || currentPath === '/' || currentPath === '#home' || currentPath === 'home') {
      return { type: 'home' as const }
    }
    
    if (currentPath === '#about' || currentPath === 'about') {
      return { type: 'about' as const }
    }
    
    if (currentPath === '#contact' || currentPath === 'contact') {
      return { type: 'contact' as const }
    }
    
    if (currentPath === '#privacy' || currentPath === 'privacy') {
      return { type: 'privacy' as const }
    }
    
    if (currentPath === '#cookies' || currentPath === 'cookies') {
      return { type: 'cookies' as const }
    }
    
    // Location pages
    const nearMeMatch = currentPath.match(/#?near-me\/(.+)/)
    if (nearMeMatch) {
      const locationSlug = nearMeMatch[1].replace(/\/$/, '')
      
      // Check if it's a town page (county-town format)
      for (const county of locationData) {
        if (locationSlug === county.slug) {
          return { type: 'county' as const, county }
        }
        
        for (const town of county.towns) {
          if (locationSlug === `${county.slug}-${town.slug}`) {
            return { type: 'town' as const, county, town }
          }
        }
      }
    }
    
    return { type: '404' as const }
  }, [currentPath])

  const page = parsePath()

  // Update meta tags dynamically
  useEffect(() => {
    let title = ''
    let description = ''

    switch (page.type) {
      case 'home':
        const homeContent = getHomepageContent()
        title = homeContent.title
        description = homeContent.description
        break
      case 'county':
        const countyContent = getLocationPageContent(page.county!.county, true)
        title = countyContent.title
        description = countyContent.description
        break
      case 'town':
        const townContent = getLocationPageContent(page.town!.name, false, page.county, page.town)
        title = townContent.title
        description = townContent.description
        break
      case 'about':
        const aboutContent = getAboutContent()
        title = aboutContent.title
        description = aboutContent.description
        break
      case 'contact':
        const contactContent = getContactContent()
        title = contactContent.title
        description = contactContent.description
        break
      case 'privacy':
        const privacyContent = getPrivacyContent()
        title = privacyContent.title
        description = privacyContent.description
        break
      case 'cookies':
        const cookiesContent = getCookiesContent()
        title = cookiesContent.title
        description = cookiesContent.description
        break
      default:
        title = 'Page Not Found | Child Injury Claims Specialists'
        description = 'The page you are looking for could not be found.'
    }

    document.title = title
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }
  }, [page])

  // Generate FAQ Schema
  const generateFAQSchema = (sections: { h2: string; content: string[] }[]) => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": sections.map(section => ({
        "@type": "Question",
        "name": section.h2,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": section.content.join(' ')
        }
      }))
    }
  }

  // Render Header
  const renderHeader = () => (
    <header className="sticky top-0 z-50 bg-[#1a2744] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <a href="#home" onClick={() => navigateTo('home')} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#f59e0b] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <span className="text-xl font-bold hidden sm:block">{SITE_CONFIG.brandName}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" onClick={() => navigateTo('home')} className="hover:text-[#f59e0b] transition-colors">Home</a>
            <a href="#about" onClick={() => navigateTo('about')} className="hover:text-[#f59e0b] transition-colors">About</a>
            <a href="#contact" onClick={() => navigateTo('contact')} className="hover:text-[#f59e0b] transition-colors">Contact</a>
          </nav>

          {/* Phone & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 text-[#f59e0b] font-semibold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {SITE_CONFIG.phone}
            </a>
            <Button 
              onClick={() => setShowLeadForm(true)}
              className="bg-[#f59e0b] hover:bg-[#d97706] text-white animate-pulse"
            >
              Get Free Assessment
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col gap-4">
              <a href="#home" onClick={() => navigateTo('home')} className="hover:text-[#f59e0b] transition-colors">Home</a>
              <a href="#about" onClick={() => navigateTo('about')} className="hover:text-[#f59e0b] transition-colors">About</a>
              <a href="#contact" onClick={() => navigateTo('contact')} className="hover:text-[#f59e0b] transition-colors">Contact</a>
              <a href={`tel:${SITE_CONFIG.phone}`} className="text-[#f59e0b] font-semibold">{SITE_CONFIG.phone}</a>
              <Button 
                onClick={() => { setShowLeadForm(true); setMobileMenuOpen(false); }}
                className="bg-[#f59e0b] hover:bg-[#d97706] text-white w-full"
              >
                Get Free Assessment
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )

  // Render Hero Section
  const renderHero = (title: string, subtitle: string, isLocation: boolean = false, locationName?: string) => (
    <section className="bg-gradient-to-br from-[#1a2744] to-[#2d3e5f] text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge className="bg-[#f59e0b] text-white px-3 py-1 text-sm">✓ No Win No Fee</Badge>
            <Badge className="bg-green-600 text-white px-3 py-1 text-sm">✓ Free Assessment</Badge>
            <Badge className="bg-blue-600 text-white px-3 py-1 text-sm">✓ 98% Success Rate</Badge>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="text-lg md:text-xl text-gray-300 mb-8">{subtitle}</p>
          
          {/* Lead Form CTA */}
          <div className="bg-white rounded-lg p-6 max-w-xl mx-auto shadow-2xl">
            <h3 className="text-[#1a2744] font-bold text-lg mb-4">
              {isLocation ? `Claim Compensation in ${locationName}` : 'Start Your Child Injury Claim Today'}
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="text" 
                placeholder="Your Name" 
                className="flex-1"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <Input 
                type="tel" 
                placeholder="Phone Number" 
                className="flex-1"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <Button 
              onClick={() => setShowLeadForm(true)}
              className="w-full mt-4 bg-[#f59e0b] hover:bg-[#d97706] text-white py-6 text-lg font-semibold"
            >
              Get Your Free Assessment →
            </Button>
            <p className="text-gray-500 text-sm mt-3">No obligation • 100% Confidential</p>
          </div>
        </div>
      </div>
    </section>
  )

  // Render Stats Bar
  const renderStatsBar = () => (
    <section className="bg-white py-8 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#1a2744]">10,000+</div>
            <div className="text-gray-600">Claims Handled</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#1a2744]">£50M+</div>
            <div className="text-gray-600">Compensation Recovered</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#1a2744]">98%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#1a2744]">200+</div>
            <div className="text-gray-600">5-Star Reviews</div>
          </div>
        </div>
      </div>
    </section>
  )

  // Render Content Section
  const renderContentSection = (h2: string, paragraphs: string[], index: number) => (
    <section key={index} className={`py-12 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">{h2}</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-4">{p}</p>
          ))}
          
          {/* CTA after every 2 sections */}
          {(index + 1) % 2 === 0 && (
            <div className="mt-8 p-6 bg-[#1a2744] rounded-lg text-white text-center">
              <p className="text-lg mb-4">Need expert advice about your child's injury claim?</p>
              <Button 
                onClick={() => setShowLeadForm(true)}
                className="bg-[#f59e0b] hover:bg-[#d97706] text-white px-8 py-6 text-lg"
              >
                Request Your Free Assessment
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )

  // Render Location Grid
  const renderLocationGrid = () => (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-4">Areas We Cover</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            We provide expert child injury claims services across the entire United Kingdom. Select your area below or search for your location.
          </p>
          
          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <Input
              type="text"
              placeholder="Search for your town or county..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                {searchResults.map(county => (
                  <div key={county.slug} className="p-2">
                    <div className="font-semibold text-[#1a2744] px-2 py-1">{county.county}</div>
                    {county.towns
                      .filter(town => town.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                     county.county.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(town => (
                        <a
                          key={town.slug}
                          href={`#near-me/${county.slug}-${town.slug}`}
                          onClick={() => { navigateTo(`near-me/${county.slug}-${town.slug}`); setSearchQuery(''); }}
                          className="block px-4 py-2 hover:bg-gray-100 rounded"
                        >
                          {town.name}, {county.county}
                        </a>
                      ))}
                    <a
                      href={`#near-me/${county.slug}`}
                      onClick={() => { navigateTo(`near-me/${county.slug}`); setSearchQuery(''); }}
                      className="block px-4 py-2 text-[#f59e0b] hover:bg-gray-100 rounded font-medium"
                    >
                      View all {county.county} →
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {locationData.map(county => (
            <a
              key={county.slug}
              href={`#near-me/${county.slug}`}
              onClick={() => navigateTo(`near-me/${county.slug}`)}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 hover:border-[#f59e0b]"
            >
              <h3 className="font-semibold text-[#1a2744] mb-1">{county.county}</h3>
              <p className="text-sm text-gray-500">{county.towns.length}+ areas</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )

  // Render How It Works
  const renderHowItWorks = () => (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#f59e0b] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-bold text-[#1a2744] mb-2">Free Consultation</h3>
            <p className="text-gray-600">Contact us for a free, no-obligation assessment of your child's injury claim. We'll advise on your options and next steps.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#f59e0b] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-bold text-[#1a2744] mb-2">We Build Your Case</h3>
            <p className="text-gray-600">Our expert solicitors gather evidence, instruct medical experts, and prepare a compelling case for maximum compensation.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#f59e0b] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-bold text-[#1a2744] mb-2">Receive Compensation</h3>
            <p className="text-gray-600">We negotiate the best possible settlement and secure court approval to ensure your child receives fair compensation.</p>
          </div>
        </div>
      </div>
    </section>
  )

  // Render Testimonials
  const renderTestimonials = () => (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] text-center mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Sarah M.", location: "Manchester", text: "After my daughter's accident at school, I didn't know where to turn. The team guided me through every step and secured a settlement that will help with her education and future needs." },
            { name: "James W.", location: "London", text: "Professional, compassionate, and incredibly thorough. They fought for my son's rights and achieved a result that exceeded our expectations. Highly recommend their services." },
            { name: "Emma T.", location: "Birmingham", text: "The no win no fee arrangement meant we could pursue justice without financial worry. The compensation has made a real difference to our child's recovery and quality of life." }
          ].map((testimonial, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <div className="flex text-[#f59e0b] mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <p className="font-semibold text-[#1a2744]">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  // Calculate Compensation
  const calculateCompensation = () => {
      const baseAmounts: Record<string, Record<string, [number, number]>> = {
        'fracture': { 'mild': [3000, 8000], 'moderate': [8000, 20000], 'severe': [20000, 50000], 'very severe': [50000, 100000] },
        'head': { 'mild': [1500, 10000], 'moderate': [10000, 50000], 'severe': [50000, 300000], 'very severe': [300000, 500000] },
        'burns': { 'mild': [2000, 8000], 'moderate': [8000, 30000], 'severe': [30000, 100000], 'very severe': [100000, 250000] },
        'psychological': { 'mild': [1500, 6000], 'moderate': [6000, 25000], 'severe': [25000, 80000], 'very severe': [80000, 150000] },
        'soft-tissue': { 'mild': [1000, 3000], 'moderate': [3000, 10000], 'severe': [10000, 30000], 'very severe': [30000, 60000] }
      }

      if (calcInjury && calcSeverity) {
        const range = baseAmounts[calcInjury]?.[calcSeverity]
        if (range) {
          setCalcResult(`Estimated Compensation: £${range[0].toLocaleString()} - £${range[1].toLocaleString()}`)
        }
      }
    }

  // Render Compensation Calculator
  const renderCalculator = () => (
    <section className="py-16 bg-[#1a2744] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Compensation Calculator</h2>
          <p className="text-gray-300 text-center mb-8">Get an estimate of potential compensation for your child's injury</p>
          
          <div className="bg-white/10 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="text-white mb-2 block">Type of Injury</Label>
                <Select value={calcInjury} onValueChange={setCalcInjury}>
                  <SelectTrigger className="bg-white text-[#1a2744]">
                    <SelectValue placeholder="Select injury type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fracture">Fracture</SelectItem>
                    <SelectItem value="head">Head Injury</SelectItem>
                    <SelectItem value="burns">Burns</SelectItem>
                    <SelectItem value="psychological">Psychological</SelectItem>
                    <SelectItem value="soft-tissue">Soft Tissue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white mb-2 block">Severity</Label>
                <Select value={calcSeverity} onValueChange={setCalcSeverity}>
                  <SelectTrigger className="bg-white text-[#1a2744]">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mild">Mild</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                    <SelectItem value="very severe">Very Severe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button onClick={calculateCompensation} className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white py-6 text-lg mb-4">
              Calculate Estimate
            </Button>
            
            {calcResult && (
              <div className="bg-[#f59e0b] rounded-lg p-4 text-center">
                <p className="text-xl font-bold">{calcResult}</p>
                <p className="text-sm mt-2">*This is an estimate only. Contact us for an accurate assessment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )

  // Render FAQ Accordion
  const renderFAQ = (sections: { h2: string; content: string[] }[]) => (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {sections.map((section, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white mb-2 rounded-lg px-4">
                <AccordionTrigger className="text-left font-semibold text-[#1a2744] hover:text-[#f59e0b]">
                  {section.h2}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {section.content.map((p, i) => (
                    <p key={i} className="mb-2">{p}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )

  // Render Breadcrumbs
  const renderBreadcrumbs = () => {
    if (page.type === 'home') return null
    
    const crumbs = [{ label: 'Home', path: 'home' }]
    
    if (page.type === 'county') {
      crumbs.push({ label: page.county!.county, path: `near-me/${page.county!.slug}` })
    } else if (page.type === 'town') {
      crumbs.push({ label: page.county!.county, path: `near-me/${page.county!.slug}` })
      crumbs.push({ label: page.town!.name, path: `near-me/${page.county!.slug}-${page.town!.slug}` })
    } else if (page.type === 'about') {
      crumbs.push({ label: 'About', path: 'about' })
    } else if (page.type === 'contact') {
      crumbs.push({ label: 'Contact', path: 'contact' })
    } else if (page.type === 'privacy') {
      crumbs.push({ label: 'Privacy Policy', path: 'privacy' })
    } else if (page.type === 'cookies') {
      crumbs.push({ label: 'Cookie Policy', path: 'cookies' })
    }
    
    return (
      <nav className="bg-white border-b py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            {crumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-gray-400">/</span>}
                {i === crumbs.length - 1 ? (
                  <span className="text-[#1a2744] font-medium">{crumb.label}</span>
                ) : (
                  <a href={`#${crumb.path}`} onClick={() => navigateTo(crumb.path)} className="text-[#f59e0b] hover:underline">
                    {crumb.label}
                  </a>
                )}
              </span>
            ))}
          </div>
        </div>
      </nav>
    )
  }

  // Render Town Links (for county pages)
  const renderTownLinks = (county: typeof locationData[0]) => (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#1a2744] mb-6 text-center">Areas We Cover in {county.county}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {county.towns.map(town => (
            <a
              key={town.slug}
              href={`#near-me/${county.slug}-${town.slug}`}
              onClick={() => navigateTo(`near-me/${county.slug}-${town.slug}`)}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 hover:border-[#f59e0b] text-center"
            >
              <h3 className="font-semibold text-[#1a2744]">{town.name}</h3>
              <p className="text-sm text-gray-500">{town.postcode}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )

  // Render Other Counties Links
  const renderOtherCounties = (currentCounty: typeof locationData[0]) => {
    const otherCounties = locationData.filter(c => c.slug !== currentCounty.slug).slice(0, 10)
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#1a2744] mb-6 text-center">Other Counties We Cover</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {otherCounties.map(county => (
              <a
                key={county.slug}
                href={`#near-me/${county.slug}`}
                onClick={() => navigateTo(`near-me/${county.slug}`)}
                className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 text-center border border-gray-200"
              >
                <h3 className="font-medium text-[#1a2744]">{county.county}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Render Nearby Towns (for town pages)
  const renderNearbyTowns = (county: typeof locationData[0], currentTown: { name: string; slug: string }) => {
    const nearbyTowns = county.towns.filter(t => t.slug !== currentTown.slug).slice(0, 8)
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#1a2744] mb-6 text-center">Other Areas Near {currentTown.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {nearbyTowns.map(town => (
              <a
                key={town.slug}
                href={`#near-me/${county.slug}-${town.slug}`}
                onClick={() => navigateTo(`near-me/${county.slug}-${town.slug}`)}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 hover:border-[#f59e0b] text-center"
              >
                <h3 className="font-semibold text-[#1a2744]">{town.name}</h3>
                <p className="text-sm text-gray-500">{town.postcode}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Render Footer
  const renderFooter = () => (
    <footer className="bg-[#1a2744] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#f59e0b] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <span className="text-xl font-bold">{SITE_CONFIG.brandName}</span>
            </div>
            <p className="text-gray-400 text-sm">Expert child injury claims specialists helping families across the UK secure compensation for injured children.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <a href="#home" onClick={() => navigateTo('home')} className="text-gray-400 hover:text-[#f59e0b]">Home</a>
              <a href="#about" onClick={() => navigateTo('about')} className="text-gray-400 hover:text-[#f59e0b]">About</a>
              <a href="#contact" onClick={() => navigateTo('contact')} className="text-gray-400 hover:text-[#f59e0b]">Contact</a>
              <a href="#privacy" onClick={() => navigateTo('privacy')} className="text-gray-400 hover:text-[#f59e0b]">Privacy Policy</a>
              <a href="#cookies" onClick={() => navigateTo('cookies')} className="text-gray-400 hover:text-[#f59e0b]">Cookie Policy</a>
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <div className="flex flex-col gap-2 text-gray-400">
              <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-[#f59e0b]">{SITE_CONFIG.phone}</a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-[#f59e0b]">{SITE_CONFIG.email}</a>
            </div>
          </div>
          
          {/* Counties */}
          <div>
            <h3 className="font-bold mb-4">Areas Covered</h3>
            <div className="grid grid-cols-2 gap-1 text-sm">
              {locationData.slice(0, 10).map(county => (
                <a
                  key={county.slug}
                  href={`#near-me/${county.slug}`}
                  onClick={() => navigateTo(`near-me/${county.slug}`)}
                  className="text-gray-400 hover:text-[#f59e0b]"
                >
                  {county.county}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Full County Grid */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <h3 className="font-bold mb-4 text-center">All Areas We Cover</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2 text-sm text-center">
            {locationData.map(county => (
              <a
                key={county.slug}
                href={`#near-me/${county.slug}`}
                onClick={() => navigateTo(`near-me/${county.slug}`)}
                className="text-gray-400 hover:text-[#f59e0b] py-1"
              >
                {county.county}
              </a>
            ))}
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p className="mb-2">This website is for informational purposes. We are regulated by the Solicitors Regulation Authority. No Win No Fee arrangements are subject to eligibility.</p>
          <p>© {new Date().getFullYear()} {SITE_CONFIG.domain.replace('https://', '')}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )

  // Render Lead Form Modal
  const renderLeadFormModal = () => (
    <Dialog open={showLeadForm} onOpenChange={setShowLeadForm}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#1a2744]">
            {leadFormStep === 4 ? 'Thank You!' : 'Start Your Claim'}
          </DialogTitle>
        </DialogHeader>
        
        {leadFormStep === 1 && (
          <div className="space-y-4">
            <Label>What type of incident was it?</Label>
            <Select value={formData.incidentType} onValueChange={(v) => setFormData({...formData, incidentType: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Select incident type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="road-traffic">Road Traffic Accident</SelectItem>
                <SelectItem value="school">School Accident</SelectItem>
                <SelectItem value="medical">Medical Negligence</SelectItem>
                <SelectItem value="public-place">Public Place Accident</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setLeadFormStep(2)} disabled={!formData.incidentType} className="w-full bg-[#f59e0b] hover:bg-[#d97706]">
              Next
            </Button>
          </div>
        )}
        
        {leadFormStep === 2 && (
          <div className="space-y-4">
            <Label>When did this happen?</Label>
            <Select value={formData.incidentDate} onValueChange={(v) => setFormData({...formData, incidentDate: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-week">Within the last week</SelectItem>
                <SelectItem value="last-month">Within the last month</SelectItem>
                <SelectItem value="last-year">Within the last year</SelectItem>
                <SelectItem value="1-3-years">1-3 years ago</SelectItem>
                <SelectItem value="over-3-years">More than 3 years ago</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button onClick={() => setLeadFormStep(1)} variant="outline" className="flex-1">Back</Button>
              <Button onClick={() => setLeadFormStep(3)} disabled={!formData.incidentDate} className="flex-1 bg-[#f59e0b] hover:bg-[#d97706]">
                Next
              </Button>
            </div>
          </div>
        )}
        
        {leadFormStep === 3 && (
          <div className="space-y-4">
            <div>
              <Label>Your Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setLeadFormStep(2)} variant="outline" className="flex-1">Back</Button>
              <Button 
                onClick={() => setLeadFormStep(4)} 
                disabled={!formData.name || !formData.phone || !formData.email} 
                className="flex-1 bg-[#f59e0b] hover:bg-[#d97706]"
              >
                Submit
              </Button>
            </div>
          </div>
        )}
        
        {leadFormStep === 4 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1a2744] mb-2">Thank You!</h3>
            <p className="text-gray-600">We've received your enquiry. One of our child injury claims specialists will contact you within 24 hours.</p>
            <Button onClick={() => { setShowLeadForm(false); setLeadFormStep(1); }} className="mt-4 bg-[#f59e0b] hover:bg-[#d97706]">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )

  // Render Cookie Banner
  const renderCookieBanner = () => (
    mounted && showCookieBanner && (
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a2744] text-white p-4 z-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
            <a href="#cookies" onClick={() => navigateTo('cookies')} className="text-[#f59e0b] underline">Learn more</a>
          </p>
          <div className="flex gap-2">
            <Button onClick={handleCookieDecline} variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a2744]">
              Decline
            </Button>
            <Button onClick={handleCookieAccept} className="bg-[#f59e0b] hover:bg-[#d97706] text-white">
              Accept
            </Button>
          </div>
        </div>
      </div>
    )
  )

  // Render 404 Page
  const render404 = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#1a2744] mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <div className="flex flex-col gap-4">
          <Button onClick={() => navigateTo('home')} className="bg-[#f59e0b] hover:bg-[#d97706] text-white">
            Go to Homepage
          </Button>
          <Button onClick={() => navigateTo('home')} variant="outline" className="border-[#1a2744] text-[#1a2744]">
            View Areas We Cover
          </Button>
        </div>
      </div>
    </div>
  )

  // Render Contact Page
  const renderContactPage = () => {
    const content = getContactContent()
    return (
      <>
        {renderBreadcrumbs()}
        {renderHero(content.h1, 'Get in touch with our child injury claims team for a free, no-obligation assessment')}
        {renderStatsBar()}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold text-[#1a2744] mb-6">Get In Touch</h2>
                <p className="text-gray-600 mb-6">Complete the form below and one of our child injury claims specialists will contact you within 24 hours for a free, no-obligation assessment.</p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Your Name</Label>
                    <Input id="contact-name" placeholder="Enter your name" />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <Input id="contact-phone" type="tel" placeholder="Enter your phone number" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea id="contact-message" placeholder="Tell us about your child's injury..." rows={4} />
                  </div>
                  <Button className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white py-6">
                    Send Message
                  </Button>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-[#1a2744] mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#f59e0b] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a2744]">Phone</h3>
                      <a href={`tel:${SITE_CONFIG.phone}`} className="text-[#f59e0b] hover:underline">{SITE_CONFIG.phone}</a>
                      <p className="text-gray-500 text-sm">Mon-Fri 9am-6pm, Sat 10am-2pm</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#f59e0b] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a2744]">Email</h3>
                      <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#f59e0b] hover:underline">{SITE_CONFIG.email}</a>
                      <p className="text-gray-500 text-sm">We respond within 24 hours</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-[#1a2744] mb-2">Why Contact Us?</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Free, no-obligation assessment
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      No win no fee available
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      98% success rate
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      100% confidential
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  // Render Static Content Page
  const renderStaticPage = (getContent: () => { title: string; description: string; h1: string; content: string }) => {
    const content = getContent()
    return (
      <>
        {renderBreadcrumbs()}
        <section className="py-16 bg-white min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-8">{content.h1}</h1>
              <div dangerouslySetInnerHTML={{ __html: content.content }} />
            </div>
          </div>
        </section>
      </>
    )
  }

  // Main Page Router
  const renderPage = () => {
    switch (page.type) {
      case 'home':
        const homeContent = getHomepageContent()
        return (
          <>
            {renderHero(homeContent.h1, 'Expert solicitors helping families across the UK claim compensation for injured children. No win no fee, free assessment.')}
            {renderStatsBar()}
            {homeContent.sections.map((section, i) => renderContentSection(section.h2, section.content, i))}
            {renderHowItWorks()}
            {renderCalculator()}
            {renderFAQ(homeContent.sections)}
            {renderLocationGrid()}
            {renderTestimonials()}
          </>
        )
      
      case 'county':
        const countyContent = getLocationPageContent(page.county!.county, true, page.county)
        return (
          <>
            {renderBreadcrumbs()}
            {renderHero(countyContent.h1, `Expert child injury claims specialists serving ${page.county!.county}. No win no fee, free assessment.`, true, page.county!.county)}
            {renderStatsBar()}
            {countyContent.sections.map((section, i) => renderContentSection(section.h2, section.content, i))}
            {renderTownLinks(page.county!)}
            {renderOtherCounties(page.county!)}
            {renderLocationGrid()}
          </>
        )
      
      case 'town':
        const townContent = getLocationPageContent(page.town!.name, false, page.county, page.town)
        return (
          <>
            {renderBreadcrumbs()}
            {renderHero(townContent.h1, `Expert child injury claims specialists in ${page.town!.name}, ${page.county!.county}. No win no fee, free assessment.`, true, page.town!.name)}
            {renderStatsBar()}
            {townContent.sections.map((section, i) => renderContentSection(section.h2, section.content, i))}
            {renderNearbyTowns(page.county!, page.town!)}
            {renderOtherCounties(page.county!)}
          </>
        )
      
      case 'about':
        return renderStaticPage(getAboutContent)
      
      case 'contact':
        return renderContactPage()
      
      case 'privacy':
        return renderStaticPage(getPrivacyContent)
      
      case 'cookies':
        return renderStaticPage(getCookiesContent)
      
      default:
        return render404()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {renderHeader()}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {renderFooter()}
      {renderLeadFormModal()}
      {renderCookieBanner()}
      
      {/* Mobile Sticky Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-2 z-40" style={{ bottom: (mounted && showCookieBanner) ? '80px' : '0' }}>
        <div className="flex gap-2">
          <a href={`tel:${SITE_CONFIG.phone}`} className="flex-1">
            <Button className="w-full bg-[#1a2744] hover:bg-[#2d3e5f] text-white">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </Button>
          </a>
          <Button onClick={() => setShowLeadForm(true)} className="flex-1 bg-[#f59e0b] hover:bg-[#d97706] text-white">
            Start Claim
          </Button>
        </div>
      </div>
    </div>
  )
}
