import { supabase } from '@/lib/supabase'

export default async function Dashboard() {
  const { data: favorites } = await supabase
    .from('user_favorites')
    .select('*')
    .eq('user_email', 'test@breedly.com')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">🐕 My Breedly Dogs</h1>
      
      {favorites?.length ? (
        <div className="grid gap-6">
          {favorites.map(fav => (
            <div key={fav.id} className="p-6 border rounded-lg shadow-md">
              <h2 className="text-2xl">{fav.breed_name} ❤️</h2>
              <p>Added: {new Date(fav.created_at).toLocaleDateString()}</p>
              <a href="/store" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded">
                🛒 {fav.breed_name} Starter Kit
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl mb-4">No dogs saved yet</p>
          <a href="/breed-selector" className="bg-green-500 text-white px-8 py-3 rounded-lg">
            🧠 Take Quiz Now
          </a>
        </div>
      )}
    </div>
  )
}
