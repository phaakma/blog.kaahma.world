interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Kapipy',
    description: `A Python wrapper around the Koordinates API to facilitate downloading data.`,
    imgSrc: '/static/images/kapipy_icon.png',
    href: 'https://phaakma.github.io/kapipy/',
  },
]

export default projectsData
