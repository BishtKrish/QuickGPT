import React, { useEffect, useState } from 'react'
import { dummyPlans } from '../assets/assets'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext.jsx'
import toast from 'react-hot-toast'

const Credits = () => {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const {token , axios}  = useAppContext()

  const fetchPlans = async () => {
    try {
      const {data} = await axios.get('/api/credit/plan',{
        headers:{Authorization: token }
      })
      if(data.success){
        setPlans(data.plans)
      }else{
        toast.error(data.message || 'Failed to fetch plans.')
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const purchasePlan = async (planId) =>{
    try {
      const {data} = await axios.post('/api/credit/purchase',{planId},{headers:{Authorization : token}})
      if(data.success){
        window.location.href = data.url
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 sm:px-10 lg:px-20 py-12">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-white">
        Credit Plans
      </h2>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-9 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`border border-gray-200 dark:border-purple-700 rounded-lg 
            shadow hover:shadow-lg transition-shadow p-4 w-64 flex flex-col items-center
            ${plan._id === 'pro'
                ? 'bg-purple-50 dark:bg-purple-900'
                : 'bg-white dark:bg-transparent'
              }`}
          >
            <div className="flex-1 text-center">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-300 mb-3">
                ${plan.price}
                <span className="text-sm font-normal text-gray-600 dark:text-purple-200">
                  {' '} / {plan.credits} credits
                </span>
              </p>
              <ul className="list-disc list-inside text-xs text-gray-700 dark:text-purple-200 space-y-1 text-left">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <button onClick={() => toast.promise(purchasePlan(plan._id),{loading: 'Processing...'})}
              className="mt-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800
              text-white text-sm font-medium py-1.5 px-4 rounded-md transition-colors cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Credits
