workflow "Build Gatsby Site" {
  on = "push"
  resolves = ["build"]
}

action "build" {
    uses = "fungw/wesleyfung.com@master"
    args = "build"
}