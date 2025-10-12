import React from 'react'

const MonthlyService = () => {
  return (
    <div>
       {/* Monthly Subscription Card */}
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-[32px]">
              <CardHeader className="text-left pb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className="w-16 h-14 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#499FC0" }}
                  >
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    Monthly Subscription
                  </CardTitle>
                </div>
                <CardDescription className="text-base text-[#2F2F2F] mt-1">
                  Save money with our monthly plan. Get 4 washes per month, one
                  each week.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-[#499FC0]" />
                    <span>Only $29/month for 4 washes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-[#499FC0]" />
                    <span>Flexible scheduling, change dates anytime</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="w-4 h-4 text-[#499FC0]" />
                    <span>1 deep cleaning session</span>
                  </div>
                </div>
                <Button
                  onClick={() => setMonthlySubscribeOpen(true)}
                  style={{ backgroundColor: "#499FC0" }}
                  className="w-full hover:opacity-90 text-white h-[45px] text-lg font-semibold"
                >
                  Get Monthly Subscription
                </Button>
              </CardContent>
            </Card>
    </div>
  )
}

export default MonthlyService
