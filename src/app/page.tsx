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
      { name: "Richmond", slug: "richmond", postcode: "TW9" },
      { name: "Greenwich", slug: "greenwich", postcode: "SE10" },
      { name: "Westcombe Park", slug: "westcombe-park", postcode: "SE3" }
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
      { name: "Wigan", slug: "wigan", postcode: "WN1" }
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
      { name: "Halifax", slug: "halifax", postcode: "HX1" }
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
      { name: "Ashford", slug: "ashford", postcode: "TN23" }
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
      { name: "Harlow", slug: "harlow", postcode: "CM20" }
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
      { name: "Fareham", slug: "fareham", postcode: "PO16" }
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
      { name: "Blackpool", slug: "blackpool", postcode: "FY1" }
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
      { name: "Redhill", slug: "redhill", postcode: "RH1" }
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
      { name: "Hitchin", slug: "hitchin", postcode: "SG5" }
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
      { name: "Windsor", slug: "windsor", postcode: "SL4" }
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
      { name: "Amersham", slug: "amersham", postcode: "HP6" },
      { name: "Beaconsfield", slug: "beaconsfield", postcode: "HP9" }
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
  serviceType: "Child Injury Claims",
  email: "sleeuk89@gmail.com"
}

// ============================================================================
// CONTENT GENERATORS - Competitor Style (No solicitors/lawyer/specialist)
// ============================================================================

const getHomepageContent = () => ({
  title: "Child Injury Claims - No Win No Fee Compensation UK",
  description: "Child injury claims help families across the UK claim compensation for injuries to children. No win no fee, free assessment. Get your claim assessed today.",
  h1: "Child Injury Claims",
  sections: [
    {
      h2: "Who Can Make A Child Injury Claim?",
      content: [
        `<a href="#home" class="text-[#f59e0b] underline font-medium">Child injury claims</a> can be made by a parent, guardian, or appropriate adult on behalf of any child who has suffered an injury due to someone else's negligence. This includes injuries sustained at school, in public places, on the road, or due to medical negligence. The claim is brought by a 'litigation friend' who acts in the child's best interests throughout the process.`,
        "Claims can be submitted for children injured as pedestrians, passengers in vehicles, during supervised activities, or while lawfully present on someone else's property. Common claimants include children injured at school, nursery, playgrounds, or healthcare settings. The three-year limitation period does not begin until the child reaches 18 years of age.",
        "Parents or guardians can submit claims on behalf of children under 18. Legal responsibility is established through negligence or breach of statutory duty. Evidence such as medical records, witness statements, and incident reports help support the assessment of liability and the value of the claim."
      ]
    },
    {
      h2: "How Much Compensation Can I Claim For A Child Injury?",
      content: [
        "Child injury claims can result in compensation ranging from £1,000 for minor injuries to over £500,000 for severe, life-changing injuries. Compensation is assessed based on the Judicial College Guidelines and includes general damages for pain, suffering, and loss of amenity, as well as special damages for financial losses.",
        "Factors affecting potential compensation include the severity of the injury, the impact on the child's quality of life, any permanent disability or scarring, psychological trauma, and the effect on future education and employment prospects. Special damages may cover medical treatment, rehabilitation, care costs, and lost future earnings.",
        "Claims are operated on a No Win, No Fee basis, subject to a success fee and insurance costs where applicable. This means there are no upfront costs, and fees are only deducted if the claim is successful. Contact us to get an estimate of your child injury claim value."
      ]
    },
    {
      h2: "What Are The Most Common Causes Of Child Injury Claims?",
      content: [
        "Child injury claims commonly arise from road traffic accidents, where children are injured as pedestrians, cyclists, or passengers. Negligent driving, failure to observe children near roads, and inadequate safety measures often contribute to these incidents. Children are particularly vulnerable in these situations due to their smaller size and limited awareness of road dangers.",
        "School and nursery accidents represent another significant category, including playground injuries, sports accidents, inadequate supervision, and exposure to hazardous materials. Educational institutions have a duty of care to protect children in their charge, and breaches of this duty can lead to valid claims.",
        "Medical negligence affecting children, including birth injuries, misdiagnosis, and surgical errors, can result in serious, lifelong consequences. Public place accidents, dog bites, and injuries from defective products also contribute to child injury statistics. Each case requires careful assessment to establish liability under applicable laws."
      ]
    },
    {
      h2: "How Do I Start A Child Injury Claim?",
      content: [
        "To start a child injury claim, relevant evidence should be gathered including medical reports documenting the injury and treatment, photographs of visible injuries or the accident scene, witness statements from those who saw the incident, and any official reports such as police or school incident records.",
        "The claim process begins with an assessment of the circumstances to determine if there are grounds for compensation. This includes reviewing the evidence, establishing who was at fault, and evaluating the extent of the child's injuries and their impact. The case can then be referred to appropriate legal representation to handle the claim.",
        "Once the case is assessed, a letter of claim is sent to the responsible party or their insurers. The defendant has a fixed period to respond. If liability is admitted, negotiations proceed. If denied, further evidence may be gathered, and court proceedings may be issued. Compensation is sought through settlement or court action."
      ]
    },
    {
      h2: "How Long Do I Have To Make A Child Injury Claim?",
      content: [
        "Child injury claims are subject to a three-year limitation period. However, this period does not begin until the child reaches 18 years of age. This means a child has until their 21st birthday to bring a claim, regardless of when the injury occurred during their childhood.",
        "Claims made on behalf of children under 18 must be submitted by a parent or guardian acting as litigation friend. This allows families to pursue compensation promptly whilst the child is still young, ensuring that funds are available for treatment, rehabilitation, and educational needs during their developmental years.",
        "If the injured person lacks mental capacity, there may be no time limit until capacity is regained. It is advisable to pursue claims as soon as possible after an incident whilst evidence is fresh and witnesses can be located. Early action often leads to better outcomes."
      ]
    },
    {
      h2: "What Evidence Is Required For A Child Injury Claim?",
      content: [
        "Child injury claims require proof of injury and evidence establishing that someone else was at fault. Documentation should include medical records from hospitals, GPs, and any ongoing treatment providers, photographs of injuries taken at the time and during recovery, and witness statements from anyone who saw the incident occur.",
        "Additional evidence may include school or nursery records, police reports for road traffic accidents or criminal incidents, expert medical reports on the prognosis and long-term impact, records of previous similar incidents, and evidence of financial losses such as travel costs and lost earnings for parents providing care.",
        "Providing comprehensive evidence helps support the assessment of the claim and ensures a smoother process. The more documentation available, the stronger the case for establishing liability and calculating appropriate compensation. All evidence should be preserved and organised from the earliest opportunity."
      ]
    },
    {
      h2: "How Long Does A Child Injury Claim Take To Settle?",
      content: [
        "Child injury claims typically settle within 6 to 18 months when liability is admitted and medical evidence is complete. Straightforward cases with minor injuries and clear liability may be resolved more quickly, whilst complex cases involving serious injuries or disputed liability can take longer.",
        "Complex cases involving serious injuries, disputed liability, or the need for long-term prognosis assessment may take over 24 months. For children with developing conditions, it may be necessary to wait until their condition has stabilised before finalising settlement to ensure all future needs are properly accounted for.",
        "Claims involving urgent medical costs may qualify for interim payments before full settlement. This allows families to access treatment, rehabilitation, and support whilst the claim is ongoing. Settlements for children must be approved by the court to ensure they are fair and in the child's best interests."
      ]
    },
    {
      h2: "Claims Involving Uninsured Or Unknown Parties",
      content: [
        "Child injury claims are still possible if the responsible party is uninsured or unknown. In road traffic accident cases involving uninsured or hit-and-run drivers, compensation may be pursued through the Motor Insurers' Bureau (MIB), which provides a scheme of last resort for victims of uninsured motorists.",
        "For incidents in public places or involving unidentified parties, claims can sometimes be pursued through local authorities, public liability insurance, or other statutory schemes. Evidence such as police reports, CCTV footage, and witness statements become particularly important in these cases to support the claim.",
        "Claims involving unidentified parties must establish liability through available evidence and legal mechanisms. An assessment can help determine the best approach for pursuing compensation based on the specific circumstances of each case."
      ]
    },
    {
      h2: "What Damages Can Be Claimed?",
      content: [
        "Child injury claims can include general damages for pain, suffering, and loss of amenity, as well as special damages for financial losses. General damages are assessed based on the nature and severity of the injury, its impact on the child's daily life, and any long-term consequences affecting their quality of life.",
        "Special damages may include medical expenses for private treatment, rehabilitation costs, travel expenses for attending appointments, equipment and aids required due to the injury, care costs provided by family members or professionals, and educational support or therapy. Future losses such as ongoing care and lost future earnings can also be claimed.",
        "The court must approve any settlement for a child to ensure it is fair and appropriate. Compensation is typically invested in the Court Funds Office until the child reaches 18, though early release can be approved for specific needs. This protects the child's interests and ensures funds are available for their future."
      ]
    },
    {
      h2: "No Win No Fee Explained",
      content: [
        "No Win, No Fee means you only pay if your claim is successful. There are no upfront legal costs to pay. If successful, a success fee capped at 25% of your damages, plus any agreed After the Event (ATE) insurance premium, may be deducted from your settlement.",
        "This arrangement makes legal representation accessible to families regardless of their financial circumstances. It removes the financial risk of pursuing a claim, as no fees are payable if the claim is unsuccessful. The success fee reflects the risk taken by the legal team in handling the case.",
        "ATE insurance protects against the risk of having to pay the defendant's costs if the claim fails. The premium for this insurance is typically only payable if the claim succeeds, and is often deducted from the settlement along with the success fee. This ensures families can pursue justice without financial worry."
      ]
    },
    {
      h2: "Why Choose Us For Your Child Injury Claim?",
      content: [
        "We help families across the UK pursue compensation for child injuries. Our experienced team manages the full process from initial assessment to final settlement, ensuring that each case is handled with care and attention to detail. We understand the challenges families face when a child has been injured.",
        "We operate on a No Win, No Fee basis, meaning there are no upfront costs and no financial risk. Our service includes gathering evidence, assessing liability, calculating compensation, negotiating with insurers, and representing the child's interests throughout. We aim to achieve the best possible outcome for every client.",
        "Contact us for a free, no-obligation assessment to see if we can assist you with your child injury claim. We can provide guidance on the claims process, likely timescales, and potential compensation values. Our team is ready to help you secure the compensation your child deserves."
      ]
    },
    {
      h2: "Areas We Cover",
      content: [
        "We provide child injury claims services across the entire United Kingdom, covering England, Scotland, Wales, and Northern Ireland. Whether you are in a major city, town, or rural area, we can assess your case and help you pursue compensation.",
        "Our service covers all counties and regions, from Greater London and the South East to Scotland and Northern Ireland. We have experience handling claims from diverse locations and can connect you with appropriate representation wherever you are based.",
        "Use the search function below or browse our areas covered to find your location. We can help with child injury claims throughout the UK, providing the same high standard of service regardless of where the incident occurred or where you are located."
      ]
    }
  ]
})

// Location page content generator
const getLocationPageContent = (location: string, isCounty: boolean, countyData?: typeof locationData[0], townData?: { name: string; slug: string; postcode: string }) => {
  const countyLink = isCounty 
    ? `<a href="#near-me/${countyData?.slug || ''}" class="text-[#f59e0b] underline font-medium">${location}</a>`
    : `<a href="#near-me/${countyData?.slug || ''}" class="text-[#f59e0b] underline font-medium">${countyData?.county || ''}</a>`
  
  const mainKeywordLink = `<a href="#home" class="text-[#f59e0b] underline font-medium">child injury claims</a>`

  return {
    title: isCounty 
      ? `Child Injury Claims in ${location} - Claim Compensation UK`
      : `Child Injury Claims in ${location} ${townData?.postcode || ''} - Claim Compensation`,
    description: `Child injury claims in ${location}. No win no fee compensation for injured children. Free assessment, expert guidance. Contact us today.`,
    h1: isCounty 
      ? `Child Injury Claims in ${location}`
      : `Child Injury Claims in ${location} ${townData?.postcode || ''}`,
    sections: [
      {
        h2: `Who Can Make A Child Injury Claim in ${location}?`,
        content: [
          `${mainKeywordLink} in ${location} can be made by any person injured due to another party's negligence or breach of duty. Eligible claimants include children injured at school, in public places, on the road, or due to medical negligence. Parents or guardians can submit claims on behalf of children under 18.`,
          `Claims on behalf of children in ${location} must be submitted by a parent or legal guardian acting as litigation friend. Legal responsibility is established through negligence or breach of statutory duty. ${isCounty ? `We cover all areas within ${location}` : `As part of ${countyData?.county}, ${location} claims`} follow the same legal principles as elsewhere in the UK.`,
          `Evidence such as medical records, witness statements, incident reports, and proof of negligence helps establish the claim. The three-year limitation period does not begin until the child reaches 18. Claims can be referred to appropriate legal representation for assessment and processing.`
        ]
      },
      {
        h2: `How Much Compensation Can I Claim For A Child Injury in ${location}?`,
        content: [
          `Child injury claims in ${location} can result in compensation ranging from £1,000 for minor injuries to over £500,000 for severe cases under UK personal injury law. Compensation is assessed based on the Judicial College Guidelines and includes general damages and special damages.`,
          `Factors affecting potential compensation include the severity of the injury, any permanent disability or scarring, psychological impact, effect on education and future prospects, and financial losses incurred. ${isCounty ? `Cases in ${location}` : `Cases in ${location} and throughout ${countyData?.county}`} are assessed on their individual merits.`,
          `We operate on a No-Win, No-Fee basis, subject to a success fee and insurance costs where applicable. No-Win, No-Fee means you only pay if your claim is successful. If successful, a success fee (capped at 25% of damages) plus any agreed insurance costs may be deducted. Contact us in ${location} to get an estimate of your compensation.`
        ]
      },
      {
        h2: `What Are The Most Common Causes Of Child Injury Claims in ${location}?`,
        content: [
          `Child injury claims under UK personal injury law are most commonly caused by road traffic accidents, school and nursery incidents, medical negligence, and accidents in public places. Legal breaches include failure to supervise adequately, negligent driving, unsafe premises, and substandard medical care.`,
          `${mainKeywordLink} in ${location} typically arise in schools, playgrounds, roads, healthcare settings, and private properties where the injured party had a legal right to be present. Common claimants include children injured as pedestrians, passengers, during sports activities, or whilst in someone else's care.`,
          `Liability is established through negligence or statutory responsibility under various laws including road traffic legislation, occupiers' liability acts, and education regulations. ${isCounty ? `Throughout ${location}` : `In ${location} and ${countyData?.county}`}, we can help assess the circumstances and establish grounds for compensation.`
        ]
      },
      {
        h2: `How Do I Start A Child Injury Claim in ${location}?`,
        content: [
          `${mainKeywordLink} involve proving that another party was negligent or breached statutory obligations. Relevant evidence includes medical records, injury photographs, witness statements, school or incident reports, and any correspondence with the responsible party.`,
          `The process begins with gathering evidence and assessing liability. A letter of claim is then sent to the responsible party or their insurers. ${isCounty ? `In ${location}` : `In ${location}, ${countyData?.county}`}, cases can be referred for assessment, with evidence reviewed to determine fault and calculate damages.`,
          `We facilitate access to No-Win, No-Fee legal representation for claims in ${location}. The process includes evidence gathering, liability assessment, negotiation with insurers, and if necessary, court proceedings. Compensation is sought through settlement or court action depending on circumstances.`
        ]
      },
      {
        h2: `How Long Do I Have To Make A Child Injury Claim in ${location}?`,
        content: [
          `Child injury claims in ${location} are subject to a three-year limitation period starting from the date of injury. Where the injured party is under 18, the time limit begins on their 18th birthday and ends when they turn 21. This extended period recognises that children cannot be expected to understand their rights.`,
          `Claims made on behalf of someone without mental capacity have no time restriction unless capacity is regained. However, it is advisable to pursue claims promptly whilst evidence is fresh and witnesses can be located. Early action typically leads to stronger cases and better outcomes.`,
          `${isCounty ? `For claims in ${location}` : `For claims in ${location} and ${countyData?.county}`}, parents or guardians should seek assessment as soon as possible after an incident. This ensures evidence is preserved and the child's interests are protected throughout the process.`
        ]
      },
      {
        h2: `What Evidence Is Needed For A Child Injury Claim in ${location}?`,
        content: [
          `Child injury claims in ${location} require proof of injury and the responsible party's breach of legal duty. Liability is established through negligence or breach of statutory duty, supported by comprehensive documentation of the incident and its consequences.`,
          `Essential evidence includes injury documentation such as hospital and GP reports, photographs of wounds taken immediately after the incident, eyewitness statements that corroborate the event, evidence of prior incidents or complaints, employment records for parents showing wage loss, and treatment receipts for therapy or rehabilitation.`,
          `Providing comprehensive evidence helps support the assessment of the claim and ensures appropriate compensation is calculated. ${isCounty ? `In ${location}` : `In ${location}, ${countyData?.county}`}, we can guide families through the evidence-gathering process to build the strongest possible case.`
        ]
      },
      {
        h2: `How Long Does A Child Injury Claim Take To Settle in ${location}?`,
        content: [
          `Child injury claims in ${location} typically settle within 6 to 18 months when liability is admitted and medical evidence is complete. Complex cases involving serious injury or court proceedings can take over 24 months, particularly if the full extent of injuries needs to be assessed over time.`,
          `For children with ongoing medical needs, it may be necessary to wait until their condition has stabilised before finalising settlement. This ensures all future care requirements and their impact on the child's life are properly accounted for in the compensation awarded.`,
          `Claims involving urgent medical costs may qualify for interim payments before full settlement. ${isCounty ? `In ${location}` : `In ${location} and throughout ${countyData?.county}`}, interim payments can help families access treatment and support whilst the claim is ongoing.`
        ]
      },
      {
        h2: `Can I Claim If The Responsible Party Is Unknown Or Uninsured?`,
        content: [
          `Child injury claims are still possible if the responsible party is unknown or uninsured. In road traffic accident cases, compensation may be pursued through the Motor Insurers' Bureau (MIB) which provides a scheme for victims of uninsured or hit-and-run drivers.`,
          `For incidents in public places or involving unidentified parties, claims can sometimes be pursued through local authorities, public liability insurance, or other statutory schemes. Evidence such as police reports and witness statements become particularly important in these circumstances.`,
          `Claims in ${location} involving unidentified parties must establish liability through available evidence and appropriate legal mechanisms. Compensation amounts depend on individual circumstances. Not all claims will succeed, but an assessment can determine the viability of pursuing compensation.`
        ]
      },
      {
        h2: `Local Support For Child Injury Claims in ${location}`,
        content: [
          `Families in ${location} pursuing child injury claims can access support throughout the claims process. ${isCounty ? `Across ${location}` : `In ${location} and ${countyData?.county}`}, we help gather evidence, assess liability, calculate compensation, and manage the entire process from initial enquiry to final settlement.`,
          `Local knowledge and understanding of ${isCounty ? `${location}` : `${countyData?.county} and ${location}`} can be valuable in building a case. We can help identify relevant local facilities for medical assessments and ensure all evidence is properly documented and preserved.`,
          `Contact us for a free, no-obligation case assessment to discuss your child's injury and potential claim. We can provide guidance on the process, likely timescales, and potential compensation based on the specific circumstances of your case.`
        ]
      },
      {
        h2: `Other Areas We Cover Near ${location}`,
        content: [
          `In addition to ${location}, we provide ${mainKeywordLink} services across the entire United Kingdom. ${isCounty ? `Within ${location}, we cover all major towns and communities` : `In ${countyData?.county} and surrounding areas, we serve clients in multiple locations`}. Our national coverage ensures families can access help regardless of where the incident occurred.`,
          `${isCounty ? `From ${location}, we also serve neighbouring counties` : `Other areas near ${location} in ${countyData?.county} are also covered by our service`}. Our team can handle claims from any location in the UK, providing consistent support and guidance throughout the claims process.`,
          `Whether the incident occurred locally or elsewhere, we can help. Use the areas covered section below to find your location, or contact us directly for a free assessment of your child injury claim.`
        ]
      }
    ]
  }
}

// Static page content
const getAboutContent = () => ({
  title: "About Us | Child Injury Claims UK",
  description: "Learn about Child Injury Claims. We help families across the UK pursue compensation for injured children on a no win no fee basis.",
  h1: "About Child Injury Claims",
  content: `
    <p class="mb-4">Child Injury Claims helps families across the UK who have children that have suffered injuries due to someone else's negligence. We provide assessment and referral services to ensure cases are handled by appropriate legal representation authorised and regulated by relevant bodies.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Our Service</h2>
    <p class="mb-4">We specialise in connecting families with experienced legal representation for child injury claims. Our service includes initial case assessment, evidence review, and referral to appropriate legal teams who operate on a No Win, No Fee basis.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">How We Work</h2>
    <p class="mb-4">When you contact us, we assess the circumstances of your child's injury to determine if there are grounds for a compensation claim. We review the evidence, establish potential liability, and connect you with legal representation suited to your case. Our service is free and without obligation.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">No Win, No Fee</h2>
    <p class="mb-4">Cases we accept are handled on a No Win, No Fee basis. This means there are no upfront costs to pay. If the claim is successful, a success fee and insurance costs may be deducted from the settlement. If unsuccessful, there is nothing to pay. This arrangement makes justice accessible to all families regardless of financial circumstances.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Contact Us</h2>
    <p class="mb-4">For a free, no-obligation assessment of your child's injury claim, contact us today. We can advise on the merits of your case, the claims process, and potential compensation. We are here to help families secure the compensation their children deserve.</p>
  `
})

const getContactContent = () => ({
  title: "Contact Us | Child Injury Claims UK",
  description: "Contact Child Injury Claims for a free, no-obligation assessment. We help families across the UK claim compensation for injured children.",
  h1: "Contact Child Injury Claims"
})

const getPrivacyContent = () => ({
  title: "Privacy Policy | Child Injury Claims UK",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal information.",
  h1: "Privacy Policy",
  content: `
    <p class="mb-4">At Child Injury Claims, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you use our services.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Information We Collect</h2>
    <p class="mb-4">We may collect personal information including your name, contact details, and information about your child's injury when you contact us. We also collect information automatically when you visit our website.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">How We Use Your Information</h2>
    <p class="mb-4">We use your information to assess your case, respond to enquiries, and connect you with appropriate legal representation. We do not sell your personal information to third parties.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Data Security</h2>
    <p class="mb-4">We implement appropriate measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Contact</h2>
    <p class="mb-4">For questions about this policy, contact us at ${SITE_CONFIG.email}.</p>
  `
})

const getCookiesContent = () => ({
  title: "Cookie Policy | Child Injury Claims UK",
  description: "Learn about how we use cookies on our website.",
  h1: "Cookie Policy",
  content: `
    <p class="mb-4">This Cookie Policy explains what cookies are, how we use them, and how you can manage your preferences.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">What Are Cookies?</h2>
    <p class="mb-4">Cookies are small text files stored on your device when you visit a website. They help websites work efficiently and provide information to website owners.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Types of Cookies We Use</h2>
    <p class="mb-4"><strong class="text-[#1a2744]">Essential Cookies:</strong> Necessary for the website to function properly.</p>
    <p class="mb-4"><strong class="text-[#1a2744]">Analytics Cookies:</strong> Help us understand how visitors use our website.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Managing Cookies</h2>
    <p class="mb-4">Most browsers allow you to control cookies through their settings. Restricting cookies may affect website functionality.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4 text-[#1a2744]">Contact</h2>
    <p class="mb-4">For questions, contact us at ${SITE_CONFIG.email}.</p>
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    incidentType: '',
    incidentDate: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  // Sidebar form state
  const [sidebarForm, setSidebarForm] = useState({
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
        title = 'Page Not Found | Child Injury Claims'
        description = 'The page you are looking for could not be found.'
    }

    document.title = title
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }
  }, [page])

  // Handle sidebar form submission
  const handleSidebarSubmit = async () => {
    if (!sidebarForm.name || !sidebarForm.phone || !sidebarForm.email) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...sidebarForm,
          location: page.type === 'county' ? page.county?.county : 
                   page.type === 'town' ? `${page.town?.name}, ${page.county?.county}` : 
                   'Homepage'
        })
      })
      
      if (response.ok) {
        setSubmitSuccess(true)
        setSidebarForm({ name: '', phone: '', email: '', message: '' })
        setTimeout(() => setSubmitSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle lead form submission
  const handleLeadFormSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.email) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          location: page.type === 'county' ? page.county?.county : 
                   page.type === 'town' ? `${page.town?.name}, ${page.county?.county}` : 
                   'Homepage'
        })
      })
      
      if (response.ok) {
        setLeadFormStep(4)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
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

  // Render Sticky Sidebar Form
  const renderStickySidebar = () => (
    <div className="hidden lg:block fixed right-4 top-24 w-80 z-40">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-[#1a2744] mb-4">Request a Free Assessment</h3>
        
        {submitSuccess ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p>Thank you! We'll contact you within 24 hours.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Your Name *"
                value={sidebarForm.name}
                onChange={(e) => setSidebarForm({...sidebarForm, name: e.target.value})}
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Phone Number *"
                value={sidebarForm.phone}
                onChange={(e) => setSidebarForm({...sidebarForm, phone: e.target.value})}
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email Address *"
                value={sidebarForm.email}
                onChange={(e) => setSidebarForm({...sidebarForm, email: e.target.value})}
                className="w-full"
              />
            </div>
            <div>
              <Textarea
                placeholder="Tell us about your case..."
                value={sidebarForm.message}
                onChange={(e) => setSidebarForm({...sidebarForm, message: e.target.value})}
                rows={3}
                className="w-full"
              />
            </div>
            <Button
              onClick={handleSidebarSubmit}
              disabled={!sidebarForm.name || !sidebarForm.phone || !sidebarForm.email || isSubmitting}
              className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </Button>
            <p className="text-xs text-gray-500 text-center">No obligation • 100% Confidential</p>
          </div>
        )}
      </div>
    </div>
  )

  // Render Hero Section
  const renderHero = (title: string, subtitle: string, isLocation: boolean = false, locationName?: string) => (
    <section className="bg-gradient-to-br from-[#1a2744] to-[#2d3e5f] text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge className="bg-[#f59e0b] text-white px-3 py-1 text-sm">✓ No Win No Fee</Badge>
            <Badge className="bg-green-600 text-white px-3 py-1 text-sm">✓ Free Assessment</Badge>
            <Badge className="bg-blue-600 text-white px-3 py-1 text-sm">✓ 98% Success Rate</Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-gray-300 mb-6">{subtitle}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowLeadForm(true)}
              className="bg-[#f59e0b] hover:bg-[#d97706] text-white px-8 py-6 text-lg font-semibold"
            >
              Enquire Today – No Obligation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )

  // Render Stats Bar
  const renderStatsBar = () => (
    <section className="bg-white py-6 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-[#1a2744]">10,000+</div>
            <div className="text-gray-600 text-sm">Claims Assessed</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-[#1a2744]">£50M+</div>
            <div className="text-gray-600 text-sm">Compensation Secured</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-[#1a2744]">98%</div>
            <div className="text-gray-600 text-sm">Success Rate</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-[#1a2744]">200+</div>
            <div className="text-gray-600 text-sm">5-Star Reviews</div>
          </div>
        </div>
      </div>
    </section>
  )

  // Render Content Section
  const renderContentSection = (h2: string, paragraphs: string[], index: number) => (
    <section key={index} className={`py-10 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-[#1a2744] mb-4">{h2}</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
      </div>
    </section>
  )

  // Render Location Grid
  const renderLocationGrid = () => (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a2744] mb-4">Areas We Cover</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            We provide child injury claims services across the entire UK. Search or select your area below.
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

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {locationData.map(county => (
            <a
              key={county.slug}
              href={`#near-me/${county.slug}`}
              onClick={() => navigateTo(`near-me/${county.slug}`)}
              className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 hover:border-[#f59e0b] text-center"
            >
              <h3 className="font-semibold text-[#1a2744] text-sm">{county.county}</h3>
              <p className="text-xs text-gray-500">{county.towns.length}+ areas</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )

  // Render Testimonials
  const renderTestimonials = () => (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a2744] text-center mb-8">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { name: "Sarah M.", location: "Manchester", text: "After my daughter's injury at school, I didn't know where to turn. The team guided me through every step and secured a settlement that will help with her future needs." },
            { name: "James W.", location: "London", text: "Professional and incredibly thorough. They handled everything efficiently and achieved a result that exceeded our expectations. Highly recommend their service." },
            { name: "Emma T.", location: "Birmingham", text: "The no win no fee arrangement meant we could pursue justice without financial worry. The compensation has made a real difference to our child's recovery." }
          ].map((testimonial, i) => (
            <div key={i} className="bg-white p-5 rounded-lg shadow">
              <div className="flex text-[#f59e0b] mb-3">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-3 text-sm italic">"{testimonial.text}"</p>
              <p className="font-semibold text-[#1a2744] text-sm">{testimonial.name}</p>
              <p className="text-xs text-gray-500">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  // Render FAQ Accordion
  const renderFAQ = (sections: { h2: string; content: string[] }[]) => (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a2744] text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {sections.map((section, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white mb-2 rounded-lg px-4">
                <AccordionTrigger className="text-left font-semibold text-[#1a2744] hover:text-[#f59e0b]">
                  {section.h2}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {section.content.map((p, i) => (
                    <p key={i} className="mb-2 text-sm" dangerouslySetInnerHTML={{ __html: p }} />
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
      <nav className="bg-white border-b py-2">
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
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-[#1a2744] mb-4 text-center">Areas Covered in {county.county}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
          {county.towns.map(town => (
            <a
              key={town.slug}
              href={`#near-me/${county.slug}-${town.slug}`}
              onClick={() => navigateTo(`near-me/${county.slug}-${town.slug}`)}
              className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 hover:border-[#f59e0b] text-center"
            >
              <h3 className="font-semibold text-[#1a2744] text-sm">{town.name}</h3>
              <p className="text-xs text-gray-500">{town.postcode}</p>
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
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-[#1a2744] mb-4 text-center">Other Counties We Cover</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {otherCounties.map(county => (
              <a
                key={county.slug}
                href={`#near-me/${county.slug}`}
                onClick={() => navigateTo(`near-me/${county.slug}`)}
                className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 text-center border border-gray-200"
              >
                <h3 className="font-medium text-[#1a2744] text-sm">{county.county}</h3>
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
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-[#1a2744] mb-4 text-center">Other Areas Near {currentTown.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {nearbyTowns.map(town => (
              <a
                key={town.slug}
                href={`#near-me/${county.slug}-${town.slug}`}
                onClick={() => navigateTo(`near-me/${county.slug}-${town.slug}`)}
                className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 hover:border-[#f59e0b] text-center"
              >
                <h3 className="font-semibold text-[#1a2744] text-sm">{town.name}</h3>
                <p className="text-xs text-gray-500">{town.postcode}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Render Footer
  const renderFooter = () => (
    <footer className="bg-[#1a2744] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#f59e0b] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <span className="text-lg font-bold">{SITE_CONFIG.brandName}</span>
            </div>
            <p className="text-gray-400 text-sm">Helping families across the UK claim compensation for injured children.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-3">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <a href="#home" onClick={() => navigateTo('home')} className="text-gray-400 hover:text-[#f59e0b] text-sm">Home</a>
              <a href="#about" onClick={() => navigateTo('about')} className="text-gray-400 hover:text-[#f59e0b] text-sm">About</a>
              <a href="#contact" onClick={() => navigateTo('contact')} className="text-gray-400 hover:text-[#f59e0b] text-sm">Contact</a>
              <a href="#privacy" onClick={() => navigateTo('privacy')} className="text-gray-400 hover:text-[#f59e0b] text-sm">Privacy Policy</a>
              <a href="#cookies" onClick={() => navigateTo('cookies')} className="text-gray-400 hover:text-[#f59e0b] text-sm">Cookie Policy</a>
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold mb-3">Contact</h3>
            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-[#f59e0b]">{SITE_CONFIG.email}</a>
            </div>
          </div>
          
          {/* Counties */}
          <div>
            <h3 className="font-bold mb-3">Areas Covered</h3>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {locationData.slice(0, 8).map(county => (
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
        
        {/* Bottom */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p className="mb-2">This website is for informational purposes. No Win No Fee arrangements are subject to eligibility.</p>
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
                onClick={handleLeadFormSubmit}
                disabled={!formData.name || !formData.phone || !formData.email || isSubmitting} 
                className="flex-1 bg-[#f59e0b] hover:bg-[#d97706]"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </div>
        )}
        
        {leadFormStep === 4 && (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1a2744] mb-2">Thank You!</h3>
            <p className="text-gray-600 text-sm">We've received your enquiry. We'll contact you within 24 hours.</p>
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
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-[#1a2744] text-white p-3 z-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm">
            We use cookies to enhance your experience.{' '}
            <a href="#cookies" onClick={() => navigateTo('cookies')} className="text-[#f59e0b] underline">Learn more</a>
          </p>
          <div className="flex gap-2">
            <Button onClick={handleCookieDecline} variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a2744] text-sm">
              Decline
            </Button>
            <Button onClick={handleCookieAccept} className="bg-[#f59e0b] hover:bg-[#d97706] text-white text-sm">
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
        <h1 className="text-5xl font-bold text-[#1a2744] mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">Page not found</p>
        <Button onClick={() => navigateTo('home')} className="bg-[#f59e0b] hover:bg-[#d97706] text-white">
          Go to Homepage
        </Button>
      </div>
    </div>
  )

  // Render Contact Page
  const renderContactPage = () => {
    const content = getContactContent()
    return (
      <>
        {renderBreadcrumbs()}
        {renderHero(content.h1, 'Contact us for a free, no-obligation assessment')}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-[#1a2744] mb-4">Get In Touch</h2>
              <p className="text-gray-600 mb-6">Complete the form below and we'll contact you within 24 hours.</p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contact-name">Your Name *</Label>
                  <Input id="contact-name" placeholder="Enter your name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Phone Number *</Label>
                  <Input id="contact-phone" type="tel" placeholder="Enter your phone number" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input id="contact-email" type="email" placeholder="Enter your email" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea id="contact-message" placeholder="Tell us about your case..." rows={4} className="mt-1" />
                </div>
                <Button onClick={() => setShowLeadForm(true)} className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white py-5">
                  Send Enquiry
                </Button>
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
        <section className="py-12 bg-white min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">{content.h1}</h1>
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
            {renderHero(homeContent.h1, 'We help families across the UK claim compensation for injured children. No win no fee, free assessment.')}
            {renderStatsBar()}
            {homeContent.sections.map((section, i) => renderContentSection(section.h2, section.content, i))}
            {renderLocationGrid()}
            {renderTestimonials()}
            {renderFAQ(homeContent.sections)}
          </>
        )
      
      case 'county':
        const countyContent = getLocationPageContent(page.county!.county, true, page.county)
        return (
          <>
            {renderBreadcrumbs()}
            {renderHero(countyContent.h1, `Child injury claims in ${page.county!.county}. No win no fee, free assessment.`)}
            {renderStatsBar()}
            {countyContent.sections.map((section, i) => renderContentSection(section.h2, section.content, i))}
            {renderTownLinks(page.county!)}
            {renderOtherCounties(page.county!)}
          </>
        )
      
      case 'town':
        const townContent = getLocationPageContent(page.town!.name, false, page.county, page.town)
        return (
          <>
            {renderBreadcrumbs()}
            {renderHero(townContent.h1, `Child injury claims in ${page.town!.name}, ${page.county!.county}. No win no fee.`)}
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
        <div className="lg:mr-[340px]">
          {renderPage()}
        </div>
      </main>
      {renderFooter()}
      {renderStickySidebar()}
      {renderLeadFormModal()}
      {renderCookieBanner()}
      
      {/* Sticky "Make an Enquiry" Button - Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 p-3" style={{ bottom: mounted && showCookieBanner ? '60px' : '0' }}>
        <div className="container mx-auto">
          <Button 
            onClick={() => setShowLeadForm(true)}
            className="w-full md:w-auto md:float-right bg-[#f59e0b] hover:bg-[#d97706] text-white py-4 px-8 text-lg font-semibold"
          >
            Make an Enquiry
          </Button>
        </div>
      </div>
    </div>
  )
}
