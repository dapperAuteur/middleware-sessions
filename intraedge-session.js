const sessions = {}
let nextSessionId = 1
module.exports = (req, res, next) => {
  function createSession() {
    const session = {
      sessionId: nextSessionId
    }
    sessions[nextSessionId] = session
    req.session = session
    setResponseCookieHeader(nextSessionId)
    nextSessionId++
  }

  function setResponseCookieHeader(id) {
    res.setHeader('set-cookie', `sessionId=${id}; path=/;`)
  }
  
  if (req.headers.cookie) {
    const sessionId = req.headers.cookie.split('=')[1]
    const session = sessions[sessionId]
    if (session) {
      console.log('Found session with id ' + sessionId, session)
      req.session = session
      setResponseCookieHeader(session.sessionId)
    } else {
      console.log('Did not find session with id ' + sessionId);
      createSession()
    }
  } else {
    createSession()
  }
  next()
}