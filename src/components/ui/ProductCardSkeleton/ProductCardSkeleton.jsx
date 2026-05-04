import Skeleton from 'react-loading-skeleton'
import { useTheme } from '../../../context/ThemeContext'

const ProductCardSkeleton = () => {
  const { isDark } = useTheme()
  const baseColor = isDark ? '#1A1A2E' : '#e0e0e0'
  const highlightColor = isDark ? '#2A2A3E' : '#f5f5f5'

  return (
    <div className="rounded-2xl overflow-hidden">
      <Skeleton
        height={200}
        baseColor={baseColor}
        highlightColor={highlightColor}
      />
      <div className="p-3">
        <Skeleton
          height={16}
          width="80%"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <Skeleton
          height={12}
          width="50%"
          className="mt-2"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <Skeleton
          height={16}
          width="40%"
          className="mt-2"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
