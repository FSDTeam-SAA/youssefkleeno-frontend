import React from 'react'

const OneTimeService = () => {
  return (
    <div>
      {/* One-time Wash Card */}
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-[32px]">
              <CardHeader className="text-left pb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className="w-20 h-14 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#499FC0" }}
                  >
                    <Car className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    One-time Wash
                  </CardTitle>
                </div>
                <CardDescription className="text-base text-[#2F2F2F] mt-1">
                  Perfect for when you need a quick clean without commitment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Droplets className="w-4 h-4 text-[#499FC0]" />
                    <span>Choose between eco or water wash</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-[#499FC0]" />
                    <span>We come to your location</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-[#499FC0]" />
                    <span>Schedule at your convenience</span>
                  </div>
                </div>
                <Button
                  style={{ backgroundColor: "#499FC0" }}
                  className="w-full hover:opacity-90 text-white h-[45px] text-lg font-semibold"
                >
                  Book a One-time Wash
                </Button>
              </CardContent>
            </Card>
    </div>
  )
}

export default OneTimeService
