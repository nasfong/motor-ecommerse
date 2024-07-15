import AllProductCard2 from "@/components/AllProductCard2";

const list = [
  {
    image: '/images/placeholder.svg',
    name: 'Dream 2024',
    type: 'Honda',
  },
  {
    image: '/images/placeholder.svg',
    name: 'Scoopy 2024',
    type: 'Honda',
  },
  {
    image: '/images/placeholder.svg',
    name: 'MSX 2020',
    type: 'Honda',
  },
  {
    image: '/images/placeholder.svg',
    name: 'Wave 2015',
    type: 'Honda',
  },
  {
    image: '/images/placeholder.svg',
    name: 'Dream 2024',
    type: 'Honda',
  },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Scoopy 2024',
  //   type: 'Honda',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'MSX 2020',
  //   type: 'Honda',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Wave 2015',
  //   type: 'Honda',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Dream 2024',
  //   type: 'Honda',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Scoopy 2024',
  //   type: 'Honda',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'MSX 2020',
  //   type: 'Honda',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Wave 2015',
  //   type: 'Honda',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Dream 2024',
  //   type: 'Suzuki',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Scoopy 2024',
  //   type: 'Suzuki',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'MSX 2020',
  //   type: 'Suzuki',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Wave 2015',
  //   type: 'Suzuki',
  // },
]

// const groupeList = list.reduce<{ [key: string]: typeof list }>((acc, item) => {
//   if (!acc[item.type]) {
//     acc[item.type] = [];
//   }
//   acc[item.type].push(item);
//   return acc;
// }, {});

const groupList = (list: any[]) => {
  return list.reduce<{ [key: string]: typeof list }>((acc, item) => {
    if (!acc[item.foodType]) {
      acc[item.foodType] = [];
    }
    acc[item.foodType].push(item);
    return acc;
  }, {})
}

async function getData(): Promise<Products> {
  const res = await fetch('http://maomkhmercuisine.online/food')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}


const AllProductPage = async () => {
  const data = await getData()

  return (
    <div className='flex flex-col gap-5'>
      {Object.entries(groupList(data.data)).map(([key, value]) => <AllProductCard2 parent={key} child={value} key={key} />)}
    </div>
  )
}

export default AllProductPage
