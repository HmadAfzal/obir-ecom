import { mergeTypeDefs} from '@graphql-tools/merge'
import productTypeDefs from './product.typedefs'
import userTypedefs from './user.typedefs'
import cartTypeDefs from './cart.typedefs'

const mergedTypedefs=mergeTypeDefs([productTypeDefs,userTypedefs,cartTypeDefs])

export default mergedTypedefs