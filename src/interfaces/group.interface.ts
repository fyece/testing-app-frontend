export interface Group {
  id: number
  name: string
  description: string
  ownerId: number
  totalUsers: number
  totalTests: number
  averageResultPercent: number | null
}
