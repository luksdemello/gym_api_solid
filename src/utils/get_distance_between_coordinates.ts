export interface Coordinates {
  latitude: number
  longitude: number
}

export function getDistanceBetweenCoordinates(from: Coordinates, to: Coordinates): number {
  const EARTH_RAY: number = 6371 // Raio médio da Terra em quilômetros

  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const fromRadian: number = (Math.PI / 180) * from.latitude
  const toRadian: number = (Math.PI / 180) * to.latitude

  const dLat: number = (to.latitude - from.latitude) * (Math.PI / 180)
  const dLon: number = (to.longitude - from.longitude) * (Math.PI / 180)

  const a: number =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(fromRadian) *
      Math.cos(toRadian) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const haversineResult: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance: number = EARTH_RAY * haversineResult

  return distance
}
