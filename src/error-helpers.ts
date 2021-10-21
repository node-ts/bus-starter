/**
 * Provided additional helpful logging if the app fails to start up
 */
export const explainInitializationError = (error: Error) => {
  const rabbitNotStarted = /ECONNREFUSED/.test(error.message)
  if (rabbitNotStarted) {
    console.warn(
      'RabbitMQ not running on port 5672. '
      + 'Try running `docker run -d -p 8080:15672 -p 5672:5672 rabbitmq:3-management`'
    )
  }

  const rabbitNotReady = /Socket closed abruptly/.test(error.message)
  if (rabbitNotReady) {
    console.warn('RabbitMQ is still starting up. Wait a minute and then try again.')
  }
}
