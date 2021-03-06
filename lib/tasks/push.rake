desc "push to heroku"

namespace :erb do
  namespace :to do
    task :haml do
      files = `find . -name *.html.erb`
      files.each_line do |file|
        file.strip!
        `bundle exec html2haml #{file} | cat > #{file.gsub(/\.erb$/, ".haml")}`
      end
    end
  end
end

task :p => :environment do
  puts '* Pushing to Github and Heroku'
  puts `git add .`
  puts `git commit -m "#{ENV['m']}" .`
  puts `git push origin master`
  puts `git push heroku master`
end

