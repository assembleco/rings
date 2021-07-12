class PagesController < ApplicationController
  def index
  end

  def show # rename 'display'
    region = params.permit(:region)[:region]
    json = `tree -Jifs #{Rails.root.join("places", region)}`
    render json: json
  end
end
